'use strict';

const express = require('express');
const { UserTypes } = require('../models/user');
const { ObjectID } = require('mongodb');
const router = express.Router();

const { Queue } = require('../models/queue');


// Add new booking for shopper
router.post('/api/queue', (req, res) => {
  if (req.session.isLoggedIn && req.session.userType !== UserTypes.Store) {
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
    Queue.addNewQueue(queue)
      .then(data => {
        res.send(data);
      })
      .catch(error => {
        res.status(400).send(error);
      });
  } else {
    res.status(404).send();
  }
});


// Get current queues for shopper
router.get('/api/queue/shopper/:username', (req, res) => {
  if (req.session.isLoggedIn && req.session.userType !== UserTypes.Store) {
    const username = req.params.username;

    Queue.getCurrentQueues(username, false)
      .then(queues => {
        if (!queues) {
          res.status(404).send();
        } else {
          res.send(queues);
        }
      })
      .catch(error => {
        res.status(500).send(error); // server error
      });
  } else {
    res.status(404).send();
  }
});


// Remove a queue
router.delete('/api/queue', (req, res) => {
  if (req.session.isLoggedIn) {
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
        res.status(500).send(error);
      });
  } else {
    res.status(404).send();
  }
});


// Get current queues for store
router.get('/api/queue/store/:username', (req, res) => {
  if (req.session.isLoggedIn && req.session.userType !== UserTypes.Shopper) {
    const username = req.params.username;

    Queue.getCurrentQueues(username, true)
      .then(queues => {
        if (!queues) {
          res.status(404).send();
        } else {
          res.send(queues);
        }
      })
      .catch(error => {
        res.status(500).send(error); // server error
      });
  } else {
    res.status(404).send();
  }
});


// Update queue
router.patch('/api/queue/:id', (req, res) => {
  if (req.session.isLoggedIn) {
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
  } else {
    res.status(404).send();
  }
});

module.exports = router;
