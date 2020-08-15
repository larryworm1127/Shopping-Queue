'use strict';

const express = require('express');
const router = express.Router();

const { User, UserTypes } = require('../models/user');
const { Store } = require('../models/store');
const { Shopper } = require('../models/shopper');
const { Queue } = require('../models/queue');
// Get profile for store owner
router.get('/api/store/profile/:username', (req, res) => {
  if (req.session.isLoggedIn && req.session.userType !== UserTypes.Shopper) {
    const username = req.params.username;

    Store.findOne({ username })
      .then(store => {
        if (!store) {
          res.status(404).send();
        } else {
          res.send(store);
        }
      })
      .catch(() => {
        res.status(500).send();
      });
  } else {
    res.status(404).send();
  }
});


// Update profile info for store owner
router.patch('/api/store/profile/:username', (req, res) => {
  if (req.session.isLoggedIn && req.session.userType !== UserTypes.Shopper) {
    const username = req.params.username;

    // get the updated store profile.
    const store = {
      username: username,
      email: req.body.email,
      storeName: req.body.storeName,
      address: req.body.location,
      coordinate: [req.body.coordinates.lat, req.body.coordinates.lng],
      type: req.body.storeType,
      customerLimit: req.body.customerLimit,
      customerShopTime: req.body.customerShopTime,
      openingTime: req.body.openTime,
      closingTime: req.body.closeTime,
    };

    Store.findOneAndUpdate({ username }, { $set: store }, { new: true })
      .then(store => {
        if (!store) {
          res.status(404).send();
        } else {
          res.send(store);
        }
      })
      .catch(() => {
        res.status(400).send();
      });
  } else {
    res.status(404).send();
  }
});


// Delete a store owners account
router.delete('/api/store/:username', (req, res) => {
  if (req.session.isLoggedIn && req.session.userType !== UserTypes.Shopper) {
    const username = req.params.username;

    // Delete the store and the user attached to the store
    Store.findOneAndRemove({ username })
      .then(store => {
        if (!store) {
          res.status(404).send();
        } else {
          User.findOneAndRemove({ username, userType: 1 }).then(user => {
            res.send({ store, user });
          });
        }
      })
      .catch(error => {
        res.status(500).send(error);
      });
  } else {
    res.status(404).send();
  }
});


// Get all stores
router.get('/api/stores', (req, res) => {
  if (req.session.isLoggedIn) {
    Store.find()
      .then(stores => {
        res.send(stores);
      })
      .catch(error => {
        res.status(500).send(error); // server error
      });
  } else {
    res.status(404).send();
  }
});


// Get all Queues for store
router.get('/api/store/queues/:username', (req, res) => {
  const storename = req.params.username;
  Queue.find({ store: storename })
    .then(queues => {
      res.send(queues);
    })
    .catch(error => {
      res.sendStatus(500).send(error); // server error
    });
});


// Get all Queues for store today
router.get('/api/store/todayqueues/:username', (req, res) => {
  const storename = req.params.username;
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  Queue.find({ store: storename, datetime: { $gte: today.toISOString(), $lt: tomorrow.toISOString() } })
    .then(queues => {
      res.send(queues);
    })
    .catch(error => {
      res.sendStatus(500).send(error); // server error
    });
});

module.exports = router;
