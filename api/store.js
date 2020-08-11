'use strict';

const express = require('express');
const { ObjectID } = require('mongodb');
const router = express.Router();

const { User } = require('../models/user');
const { Store } = require('../models/store');


// Get profile for store owner
router.get('/api/store/:username', (req, res) => {
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
router.patch('/api/store/profile', (req, res) => {

  const id = req.body.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send();
    return;
  }

  // get the updated store profile.
  const store = {
    username: req.body.username,
    email: req.body.email,
    storeName: req.body.storeName,
    address: req.body.address,
    coordinate: req.body.coordinate,
    type: req.body.type,
    customerLimit: req.body.customerLimit,
    customerShopTime: req.body.customerShopTime,
    openingTime: req.body.openingTime,
    closingTime: req.body.closingTime,
  };

  // Update the store by its id.
  Store.findByIdAndUpdate(id, { $set: store }, { new: true })
    .then(store => {
      if (!store) {
        res.status(404).send();
      } else {
        res.send(store);
      }
    })
    .catch(() => {
      res.status(400).send(); // bad request for changing the student.
    });
});

//Delete a store owners account
router.delete('/api/store/profile', (req, res) => {
  const id = req.body.id;

  // Validate id
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
    return;
  }

  // Delete the store and the user attached to the store
  Store.findByIdAndRemove(id)
    .then(store => {
      if (!store) {
        res.status(404).send();
      } else {
        User.remove({ username: store.username })
          .then(user => {
            res.send({ 'Store': store });
          });
      }
    })
    .catch(error => {
      res.status(500).send(); // server error, could not delete.
    });
});


// Get store by ID
router.get('/api/store/:id', (req, res) => {

  const id = req.params.id;

  Store.findById(id)
    .then(store => {
      res.send(store);
    })
    .catch(error => {
      res.status(500).send(error); // server error
    });
});

module.exports = router;
