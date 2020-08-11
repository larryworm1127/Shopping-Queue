'use strict'

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
    date: req.body.date,
    shopTime: req.body.shopTime,
    numCustomers: req.body.numCustomers,
    dateTimeQueued: req.body.dateTimeQueued
  });

  // Save queue to the database and add to shopper queue history
  queue.save().then(
    result1 => {
      Shopper.updateOne(
        { 'username': req.body.username },
        { $push: { 'queueHistory': queue } }
      ).then((result2) => {
        Shopper.find({ username: req.body.username })
          .then((result3) => {
            res.send({ 'Shopper': result3, 'Queue': result1 });
          });
      });
    },
    error => {
      res.status(400).send(error); // 400 for bad request
    }
  );
});


// Get queues for shopper
router.get('/api/queue/:username', (req, res) => {
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


// Get queues for store
router.get('/api/store/queue', (req, res) => {

  const storeName = req.body.store;

  Queue.find({ store: storeName })
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


// Get queues for admin (gets all queues)
router.get('/api/admin/queue', (req, res) => {

  Queue.find()
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

module.exports = router
