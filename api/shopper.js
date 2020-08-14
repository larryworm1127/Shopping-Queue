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
router.patch('/api/shopper/profile/favorites/:shopperUsername/:storeUsername', (req, res) => {

  const shopperUsername = req.params.shopperUsername; //username of shopper
  const storeUsername = req.params.storeUsername; //username of store you want to add to favorites

  Store.findOne({username: storeUsername})
    .then(store => {
      if (!store) {
        res.status(404).send();
      } else {
        Shopper.updateOne(
          { 'username': shopperUsername },
          {
            $push: { 'favouriteStores': storeUsername }

          }).then(result => {
          if (!result) {
            res.status(404).send('Resource not found');
          } else {
            Shopper.findOne({ username: shopperUsername }).then(shopper => {
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
router.delete('/api/shopper/profile/favorites/:shopperUsername/:storeUsername', (req, res) => {

  const shopperUsername = req.params.shopperUsername; //username of shopper
  const storeUsername = req.params.storeUsername; //username of store you want to add to favorites
  
  // Delete the store from favorites
  Store.findOne({username: storeUsername})
    .then(store => {
      console.log(store);
      Shopper.updateOne(
        { 'username': shopperUsername },
        { $pull: { 'favouriteStores': storeUsername } }
      ).then(result => {
        Shopper.findOne({username: shopperUsername}).then(shopper => {
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
