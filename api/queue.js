'use strict';

const express = require('express');
const { ObjectID } = require('mongodb');
const router = express.Router();

const { Shopper } = require('../models/shopper');
const { Queue } = require('../models/queue');


//Add new booking for shopper
router.post('/api/queue', (req, res) => {

  // Create a new queue
  const queue = new Queue({
    username: req.body.username,
    store: req.body.store,
    datetime: req.body.datetime,
    shopTime: req.body.shopTime,
    numCustomers: req.body.numCustomers,
    datetimeQueued: req.body.datetimeQueued
  });

  // Save queue to the database and add to shopper queue history
  queue.save().then(
    newQueue => {
      Shopper.updateOne(
        { 'username': req.body.username },
        {
          $push: {
            'queueHistory': {
              store: queue.store,
              searchDate: queue.datetimeQueued,
              queuedFor: queue.datetime
            }
          }
        },
        { new: true }
      ).then(shopper => {
        res.send({ 'Shopper': shopper, 'Queue': newQueue });
      });
    },
    error => {
      res.status(400).send(error);  // 400 for bad request
    }
  );
});


// Get queues for shopper
router.get('/api/queue/shopper/:username', (req, res) => {
  const username = req.params.username;

  Queue.find({ username: username })
    .then(queues => {
      if (!queues) {
        res.status(404).send();
      } else {
        res.send(queues);
      }
    })
    .catch(() => {
      res.status(500).send(); // server error
    });
});


// Remove a queue
router.delete('/api/queue', (req, res) => {
  const id = req.body.id;

  // Validate id
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
    return;
  }

  // Delete a queue by its id
  Queue.findByIdAndRemove(id)
    .then(queue => {
      if (!queue) {
        res.status(404).send();
      } else {
        res.send(queue);
      }
    })
    .catch(error => {
      res.status(500).send(); // server error, could not delete.
    });
});


// Get current queues for store
router.get('/api/queue/store/:username', (req, res) => {
  const username = req.params.username;

  Queue.find({ store: username, datetime: { $gte: new Date().toISOString() } })
    .then(queues => {
      if (!queues) {
        res.status(404).send();
      } else {
        res.send(queues);
      }
    })
    .catch(() => {
      res.status(500).send(); // server error
    });
});


// Update queue
router.patch('/api/queue/:id', (req, res) => {
  const id = req.params.id;

  // Validate id
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
    return;
  }

  const queue = {
    datetime: new Date(req.body.datetime),
    numCustomers: req.body.numCustomers,
    shopTime: req.body.shopTime
  };

  Queue.findByIdAndUpdate(id, { $set: queue }, { new: true })
    .then(queue => {
      if (!queue) {
        res.status(404).send();
      } else {
        res.send(queue);
      }
    })
    .catch(() => {
      res.status(400).send();
    });
});


module.exports = router;
