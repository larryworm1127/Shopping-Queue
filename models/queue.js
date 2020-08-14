'use strict';

const { model, Schema } = require('mongoose');
const validator = require('validator');
const { Store } = require('./store');


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
