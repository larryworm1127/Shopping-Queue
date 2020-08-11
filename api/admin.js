'use strict';

const express = require('express');
const router = express.Router();

const { User } = require('../models/user');
const { Admin } = require('../models/admin');
const { HelpMessage } = require('../models/helpMessage');


// Get profile for admin
router.get('/api/admin/:username', (req, res) => {
  const username = req.params.username;

  Admin.findOne({ username })
    .then(admin => {
      if (!admin) {
        res.status(404).send();
      } else {
        res.send(admin);
      }
    })
    .catch(() => {
      res.status(500).send(); // server error
    });
});


// Update profile info for admin
router.patch('/api/admin/:username', (req, res) => {
  const username = req.params.username;

  // get the updated store profile.
  const body = {
    username: username,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address
  };

  Admin.findOneAndUpdate({ username }, { $set: body }, { new: true, runValidators: true })
    .then(admin => {
      if (!admin) {
        res.status(404).send();
      } else {
        res.send(admin);
      }
    })
    .catch(error => {
      res.status(400).send(error);
    });
});


// Delete an admins account
router.delete('/api/admin/profile', (req, res) => {
  const id = req.body.id;

  // Delete the admin and the user attached to the admin
  Admin.findByIdAndRemove(id)
    .then(admin => {
      if (!admin) {
        res.status(404).send();
      } else {
        User.remove({ username: admin.username, userType: 2 })
          .then(user => {
            res.send({ Admin: admin, User: user });
          });
      }
    })
    .catch(error => {
      res.status(500).send(error);
    });
});


// Get all messages
router.get('/api/admin/messages', (req, res) => {

  HelpMessage.find()
    .then(message => {
      res.send(message);
    })
    .catch(error => {
      res.status(500).send(error); // server error
    });
});

module.exports = router;
