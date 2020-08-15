'use strict';

const express = require('express');
const router = express.Router();

const { User, UserTypes } = require('../models/user');
const { Store } = require('../models/store');
const { Shopper } = require('../models/shopper');


// Get profile for shopper
router.get('/api/shopper/profile/:username', (req, res) => {
  if (req.session.isLoggedIn && req.session.userType !== UserTypes.Store) {
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
        res.status(500).send(error);
      });
  } else {
    res.status(404).send();
  }
});


// Update profile info for shopper
router.patch('/api/shopper/profile/:username', (req, res) => {
  if (req.session.isLoggedIn && req.session.userType !== UserTypes.Store) {
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
  } else {
    res.status(404).send();
  }
});


// Add store to favorites
router.patch('/api/shopper/favorites/:shopperUsername/:storeUsername', (req, res) => {
  if (req.session.isLoggedIn && req.session.userType !== UserTypes.Store) {
    const shopperUsername = req.params.shopperUsername; // username of shopper
    const storeUsername = req.params.storeUsername; // username of store you want to add to favorites

    Store.findOne({ username: storeUsername })
      .then(store => {
        if (!store) {
          res.status(404).send();
        } else {
          Shopper.updateOne(
            { 'username': shopperUsername },
            { $push: { 'favouriteStores': storeUsername } }
          ).then(result => {
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
        res.status(500).send(error);
      });
  } else {
    res.status(404).send();
  }
});


// Get favorite stores
router.get('/api/shopper/favorites/:username', (req, res) => {
  if (req.session.isLoggedIn && req.session.userType !== UserTypes.Store) {
    const username = req.params.username;

    Shopper.getFavoriteStores(username)
      .then(stores => {
        res.send(stores);
      })
      .catch(error => {
        res.status(400).send(error);
      });
  } else {
    res.status(404).send();
  }
});


// Add to view history
router.post('/api/shopper/viewHistory/:username', (req, res) => {
  if (req.session.isLoggedIn && req.session.userType !== UserTypes.Store) {
    const username = req.params.username;

    Shopper.updateOne(
      { username },
      { $push: { viewHistory: { store: req.body.store, searchDate: new Date().toISOString() } } },
    )
      .then(result => {
        res.send(result);
      })
      .catch(error => {
        res.status(500).send(error);
      });
  } else {
    res.status(404).send();
  }
});


// Get view history stores
router.get('/api/shopper/viewHistory/:username', (req, res) => {
  if (req.session.isLoggedIn && req.session.userType !== UserTypes.Store) {
    const username = req.params.username;

    Shopper.getViewHistory(username)
      .then(stores => {
        res.send(stores);
      })
      .catch(error => {
        res.status(400).send(error);
      });
  } else {
    res.status(404).send();
  }
});


// Update view history
router.delete('/api/shopper/viewHistory/:username', (req, res) => {
  if (req.session.isLoggedIn && req.session.userType !== UserTypes.Store) {
    const username = req.params.username;

    Shopper.updateOne(
      { username },
      { $pull: { viewHistory: { '_id': req.body.id } } },
    )
      .then(result => {
        res.send(result);
      })
      .catch(error => {
        res.status(500).send(error);
      });
  } else {
    res.status(404).send();
  }
});


// Get queue history stores
router.get('/api/shopper/queueHistory/:username', (req, res) => {
  if (req.session.isLoggedIn && req.session.userType !== UserTypes.Store) {
    const username = req.params.username;

    Shopper.getQueueHistory(username)
      .then(queues => {
        res.send(queues);
      })
      .catch(error => {
        res.status(400).send(error);
      });
  } else {
    res.status(404).send();
  }
});


// Remove queue history
router.delete('/api/shopper/queueHistory/:username', (req, res) => {
  if (req.session.isLoggedIn && req.session.userType !== UserTypes.Store) {
    const username = req.params.username;

    Shopper.updateOne(
      { username },
      { $pull: { queueHistory: { '_id': req.body.id } } },
    )
      .then(result => {
        res.send(result);
      })
      .catch(error => {
        res.status(500).send(error);
      });
  } else {
    res.status(404);
  }
});


// Remove store from favorites
router.delete('/api/shopper/favorites/:shopperUsername/:storeUsername', (req, res) => {
  if (req.session.isLoggedIn && req.session.userType !== UserTypes.Store) {
    const shopperUsername = req.params.shopperUsername; //username of shopper
    const storeUsername = req.params.storeUsername; //username of store you want to add to favorites

    // Delete the store from favorites
    Store.findOne({ username: storeUsername })
      .then(store => {
        console.log(store);
        Shopper.updateOne(
          { 'username': shopperUsername },
          { $pull: { 'favouriteStores': storeUsername } }
        ).then(result => {
          Shopper.findOne({ username: shopperUsername }).then(shopper => {
            res.send(shopper);
          });
        });
      })
      .catch(error => {
        res.status(500).send(error);
      });
  } else {
    res.status(404).send();
  }
});


// Delete a shoppers account
router.delete('/api/shopper/:username', (req, res) => {
  if (req.session.isLoggedIn && req.session.userType === UserTypes.Admin) {
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
  } else {
    res.status(404).send();
  }
});


// Get all shoppers
router.get('/api/shoppers', (req, res) => {
  if (req.session.isLoggedIn && req.session.userType === UserTypes.Admin) {
    Shopper.find()
      .then(shoppers => {
        res.send(shoppers);
      })
      .catch(error => {
        res.status(500).send(error);
      });
  } else {
    res.status(404).send();
  }
});

module.exports = router;
