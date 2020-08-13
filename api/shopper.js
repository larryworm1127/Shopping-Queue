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


// Get favorite stores
router.get('/api/shopper/favorites/:username', (req, res) => {
  const username = req.params.username;

  Shopper.getFavoriteStores(username)
    .then(stores => {
      res.send(stores);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});


// Get search history stores
router.get('/api/shopper/searchHistory/:username', (req, res) => {
  const username = req.params.username;

  Shopper.getSearchHistory(username)
    .then(stores => {
      res.send(stores);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});


// Get queue history stores
router.get('/api/shopper/queueHistory/:username', (req, res) => {
  const username = req.params.username;

  Shopper.getQueueHistory(username)
    .then(stores => {
      res.send(stores);
    })
    .catch(error => {
      res.status(400).send(error);
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
router.delete('/api/shopper/:username', (req, res) => {
  const username = req.params.username;

  // Delete the shopper and the user attached to the shopper
  Shopper.findOneAndRemove({ username })
    .then(shopper => {
      if (!shopper) {
        res.status(404).send();
      } else {
        User.findOneAndRemove({ username, userType: 0 }).then(user => {
          res.send({ shopper, user });
        });
      }
    })
    .catch(error => {
      res.status(500).send(error);
    });
});


// Get all shoppers
router.get('/api/shoppers', (req, res) => {

  Shopper.find()
    .then(shoppers => {
      res.send(shoppers);
    })
    .catch(error => {
      res.status(500).send(error); // server error
    });
});

module.exports = router;
