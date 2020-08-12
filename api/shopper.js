'use strict';

const express = require('express');
const { ObjectID } = require('mongodb');
const router = express.Router();

const { User } = require('../models/user');
const { Store } = require('../models/store');
const { Shopper } = require('../models/shopper');


// Get profile for shopper
router.get('/api/shopper/profile/:username', (req, res) => {
  const username = req.params.username;

  Shopper.findOne({ username })
    .then(shopper => {
      if (!shopper) {
        res.status(404).send();
      } else {
        res.send(shopper);
      }
    })
    .catch(error => {
      res.status(500).send(error); // server error
    });
});


// Update profile info for shopper
router.patch('/api/shopper/profile/:username', (req, res) => {
  const username = req.params.username;

  // get the updated shopper profile.
  const shopper = {
    username: username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    address: req.body.address,
    remindTime: req.body.remindTime,
  };

  // Update the shopper by its username.
  Shopper.findOneAndUpdate({ username }, { $set: shopper }, { new: true })
    .then(shopper => {
      if (!shopper) {
        res.status(404).send();
      } else {
        res.send(shopper);
      }
    })
    .catch(() => {
      res.status(400).send();
    });
});


// Add store to favorites
router.patch('/api/shopper/profile/favorites', (req, res) => {

  const shopperID = req.body.shopperID; //id of shopper
  const storeID = req.body.storeID; //id of store you want to add to favorites

  if (!ObjectID.isValid(shopperID)) {
    res.status(404).send(); // if invalid id, definitely can't find resource, 404.
    return;
  }

  if (!ObjectID.isValid(storeID)) {
    res.status(404).send(); // if invalid id, definitely can't find resource, 404.
    return;
  }

  Store.findById(storeID)
    .then(store => {
      if (!store) {
        res.status(404).send();
      } else {
        Shopper.updateOne(
          { '_id': shopperID },
          {
            $push: { 'favouriteStores': store }

          }).then(result => {
          if (!result) {
            res.status(404).send('Resource not found');
          } else {
            Shopper.findById(shopperID).then(shopper => {
              res.send(shopper);
            });
          }
        });
      }
    })
    .catch(error => {
      res.status(500).send(); // server error
    });
});


// Remove store from favorites
router.delete('/api/shopper/profile/favorites', (req, res) => {

  const shopperID = req.body.shopperID; //id of shopper
  const storeID = req.body.storeID; //id of store you want to add to favorites

  if (!ObjectID.isValid(shopperID)) {
    res.status(404).send(); // if invalid id, definitely can't find resource, 404.
    return;
  }

  if (!ObjectID.isValid(storeID)) {
    res.status(404).send(); // if invalid id, definitely can't find resource, 404.
    return;
  }

  // Delete the store from favorites
  Store.findById(storeID)
    .then(store => {
      Shopper.updateOne(
        { '_id': shopperID },
        { $pull: { 'favouriteStores': store._id } }
      ).then(result => {
        Shopper.findById(shopperID).then(shopper => {
          res.send(shopper);
        });
      });
    }).catch(error => {
    res.status(500).send(); // server error
  });

});


// Delete a shoppers account
router.delete('/api/shopper/profile', (req, res) => {
  const id = req.body.id;

  // Validate id
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
    return;
  }

  // Delete the shopper and the user attached to the shopper
  Shopper.findByIdAndRemove(id)
    .then(shopper => {
      if (!shopper) {
        res.status(404).send();
      } else {
        User.remove({ username: shopper.username })
          .then(user => {
            res.send({ 'Shopper': shopper });
          });
      }
    })
    .catch(error => {
      res.status(500).send(); // server error, could not delete.
    });
});


// Get all stores for map
router.get('/api/map', (req, res) => {

  Store.find()
    .then(store => {
      res.send(store);
    })
    .catch(error => {
      res.status(500).send(error); // server error
    });
});

module.exports = router;
