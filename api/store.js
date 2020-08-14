'use strict';

const express = require('express');
const router = express.Router();

const { User } = require('../models/user');
const { Store } = require('../models/store');


// Get profile for store owner
router.get('/api/store/profile/:username', (req, res) => {
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
      res.status(500).send(); // server error
    });
});


// Update profile info for store owner
router.patch('/api/store/profile/:username', (req, res) => {
  const username = req.params.username;

  // get the updated store profile.
  const store = {
    username: username,
    email: req.body.email,
    storeName: req.body.storeName,
    address: req.body.address,
    coordinate: req.body.coordinate,
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
});


// Delete a store owners account
router.delete('/api/store/:username', (req, res) => {
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
});


// Get all stores
router.get('/api/stores', (req, res) => {

  Store.find()
    .then(stores => {
      res.send(stores);
    })
    .catch(error => {
      res.status(500).send(error); // server error
    });
});

module.exports = router;
