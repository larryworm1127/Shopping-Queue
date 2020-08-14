'use strict';

const { model, Schema } = require('mongoose');
const validator = require('validator');
const { Store } = require('./store');
const { Shopper } = require('./shopper');
const date = require('date-and-time');


const QueueSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  store: {
    type: String,
    required: true,
    trim: true
  },
  datetime: {
    type: Date,
    required: true,
    trim: true,
    validate: {
      validator: validator.isDate,
      message: 'Not valid date'
    }
  },
  shopTime: {
    type: Number,
    required: true,
  },
  numCustomers: {
    type: Number,
    required: true
  },
  datetimeQueued: {
    type: Date,
    required: true,
    trim: true,
    validate: {
      validator: validator.isDate,
      message: 'Not valid date'
    }
  }
});


QueueSchema.statics.addNewQueue = function (queue) {
  const Queue = this;
  const parsedDate = new Date(queue.datetime.valueOf());
  const parsedDateAfterShop = date.addMinutes(parsedDate, parseInt(queue.shopTime));

  // Helper functions for verifying queue infos
  // Check booking time with time queued
  const verifyQueueTime = ({ datetimeQueued }) => {
    return parsedDate > new Date(datetimeQueued);
  };

  // Check booking time with store open and close time
  const verifyStoreTime = ({ openingTime, closingTime }) => {
    const time = date.format(parsedDate, 'HH:mm');

    if (openingTime === closingTime) {
      return true;
    }
    return (time >= openingTime && date.format(parsedDateAfterShop, 'HH:mm') < closingTime);
  };

  // Check number of customer with store customer limit
  const verifyNumCustomer = ({ numCustomers }, { customerLimit }) => {
    return numCustomers <= customerLimit;
  };

  // Check that there is enough space for new queue
  const verifyWithOtherQueues = (queues, numCustomers, customerLimit) => {
    let customerCount = 0;
    queues.forEach((otherQueue) => {
      const time = new Date(otherQueue.datetime.valueOf());
      const timeAfterShop = date.addMinutes(time, parseInt(otherQueue.shopTime));

      if (time <= parsedDate && parsedDate <= timeAfterShop) {
        customerCount += parseInt(otherQueue.numCustomers);
      } else if (time < parsedDateAfterShop && parsedDateAfterShop <= timeAfterShop) {
        customerCount += parseInt(otherQueue.numCustomers);
      } else if (parsedDate <= time && time < parsedDateAfterShop) {
        customerCount += parseInt(otherQueue.numCustomers);
      }
    });
    return (customerCount + numCustomers) <= customerLimit;
  };

  return Store.findOne({ username: queue.store }).then((store) => {
    if (!verifyQueueTime(queue)) {
      return Promise.reject({ message: 'Can\'t place queue before current time.' });
    }

    if (!verifyStoreTime(store)) {
      return Promise.reject({ message: 'Can\'t place queue outside of store hours.' });
    }

    if (!verifyNumCustomer(queue, store)) {
      return Promise.reject({ message: 'Too many customers.' });
    }

    return Queue.find({
      store: queue.store,
      datetime: {
        $gt: date.parse(date.format(parsedDate, 'YYYY/MM/DD'), 'YYYY/MM/DD'),
        $lt: date.addDays(date.parse(date.format(parsedDate, 'YYYY/MM/DD'), 'YYYY/MM/DD'), 1)
      }
    }).then(queues => {
      if (!verifyWithOtherQueues(queues, queue.numCustomers, store.customerLimit)) {
        return Promise.reject({ message: 'Store full at selected time.' });
      }

      // New queue passes all verification, and is now to be saved
      return queue.save().then(newQueue => {
        return Shopper.updateOne(
          { 'username': queue.username },
          {
            $push: {
              'queueHistory': {
                store: queue.store,
                searchDate: queue.datetimeQueued,
                queuedFor: queue.datetime
              }
            }
          },
        ).then(() => {
          return Promise.resolve(newQueue);
        });
      });
    });
  });
};


QueueSchema.statics.getCurrentQueues = function (username, isStore) {
  const Queue = this;

  const filter = { datetime: { $gte: new Date().toISOString() } };
  (isStore) ? filter.store = username : filter.username = username;
  return Queue.find(filter).then(queues => {
    if (!queues) {
      return Promise.reject();
    } else if (queues.length === 0) {
      return Promise.resolve([]);
    }

    return Store.findOne({ username: queues[0].store }).then(store => {
      if (!store) {
        return Promise.reject();
      }

      const updatedQueues = queues.map((queue) => {
        queue.store = store.storeName;
        return queue;
      });
      return Promise.resolve(updatedQueues);
    });
  });
};


const Queue = model('Queue', QueueSchema);

module.exports = { Queue };
