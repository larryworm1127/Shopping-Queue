'use strict';

const express = require('express');
const router = express.Router();

const { User, UserTypes } = require('../models/user');
const { Store } = require('../models/store');
const { Admin } = require('../models/admin');
const { Shopper } = require('../models/shopper');


// A route to login and create a session
router.post('/api/login', (req, res) => {
  const { username, password, userType } = req.body;

  User.verifyCredential(username, password, userType)
    .then((user) => {
      req.session.userId = user._id;
      req.session.userType = user.userType;
      req.session.username = user.username;
      res.send({ currentUser: user.username, userType: user.userType });
    })
    .catch(errorMsg => {
      res.status(400).send({ message: errorMsg });
    });
});


// A route to logout a user
router.get('/api/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.redirect('/');
    }
  });
});


// A route to check if a use is logged in on the session cookie
router.get('/api/check-session', (req, res) => {
  const { username, userType } = req.session;

  if (username) {
    res.send({ currentUser: username, userType: userType });
  } else {
    res.status(401).send();
  }
});


// Verify register account info
router.post('/api/verifyRegister', (req, res) => {
  const { username, password, confirmPassword, userType } = req.body;

  User.verifyRegister(username, password, confirmPassword, userType)
    .then(() => res.send())
    .catch(errorMsg => res.status(400).send({ message: errorMsg }));
});


// Register a new admin
// (requires secret passcode which will be embedded in env var in production)
router.post('/api/register/admin', (req, res) => {
  const { username, password, passcode } = req.body;
  if (passcode === 'team21') {
    const user = new User({
      username: username,
      password: password,
      userType: 2
    });

    const { firstName, lastName, email, address } = req.body;
    const profile = new Admin({ username, firstName, lastName, email, address });

    user.save()
      .then(newUser => {
        profile.save()
          .then(newProfile => {
            res.send({ user: newUser, profile: newProfile });
          })
          .catch((error) => {
            res.status(400).send(error);
          });
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  } else {
    res.status(404).send();
  }
});


// Register a new user
router.post('/api/register', (req, res) => {

  const user = new User({
    username: req.body.username,
    password: req.body.password,
    userType: req.body.registerAs
  });

  const profile = (req.body.registerAs === UserTypes.Store) ?
    // New user is a store
    new Store({
      username: req.body.username,
      storeName: req.body.storeName,
      email: req.body.email,
      address: req.body.location,
      coordinate: [43, -79],
      type: req.body.storeType,
      openingTime: req.body.openTime,
      closingTime: req.body.closeTime,
      customerLimit: req.body.customerLimit,
      customerShopTime: req.body.shoppingTimeLimit
    })
    :
    // New user is a store
    new Shopper({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      address: req.body.address,
      remindTime: req.body.remindTime,
      favouriteStores: [],
      searchHistory: [],
      queueHistory: []
    });

  // Save the user and profile
  user.save()
    .then((user) => {
      profile.save()
        .then((profile) => {
          res.send({ profile: profile, user: user });
        })
        .catch((error) => {
          res.status(400).send({ message: error });
        });
    })
    .catch((error) => {
      res.status(400).send({ message: error });
    });
});

module.exports = router;
