'use strict';

const express = require('express');
const router = express.Router();

const { User, UserTypes } = require('../models/user');
const { Admin } = require('../models/admin');
const { HelpMessage } = require('../models/helpMessage');


// Get profile for admin
router.get('/api/admin/profile/:username', (req, res) => {
  if (req.session.isLoggedIn && req.session.userType === UserTypes.Admin) {
    const username = req.params.username;

    Admin.findOne({ username })
      .then(admin => {
        if (!admin) {
          res.status(404).send();
        } else {
          res.send(admin);
        }
      })
      .catch(error => {
        res.status(500).send(error);
      });
  } else {
    res.status(404).send();
  }
});


// Update profile info for admin
router.patch('/api/admin/profile/:username', (req, res) => {
  if (req.session.isLoggedIn && req.session.userType === UserTypes.Admin) {
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
  } else {
    res.status(404).send();
  }
});


// Delete an admins account
router.delete('/api/admin/profile', (req, res) => {
  if (req.session.isLoggedIn && req.session.userType === UserTypes.Admin) {
    const id = req.body.id;

    // Delete the admin and the user attached to the admin
    Admin.findByIdAndRemove(id)
      .then(admin => {
        if (!admin) {
          res.status(404).send();
        } else {
          User.remove({ username: admin.username, userType: UserTypes.Admin })
            .then(user => {
              res.send({ Admin: admin, User: user });
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


// Get all messages
router.get('/api/admin/messages', (req, res) => {
  if (req.session.isLoggedIn && req.session.userType === UserTypes.Admin) {
    HelpMessage.find()
      .then(message => {
        res.send(message);
      })
      .catch(error => {
        res.status(500).send(error); // server error
      });
  } else {
    res.status(404).send();
  }
});


// Add help message
router.post('/api/admin/messages', (req, res) => {
  if (req.session.isLoggedIn && req.session.userType !== UserTypes.Admin) {
    const { username, userType, title, description, date } = req.body;
    const message = new HelpMessage({ username, userType, title, description, date });

    message.save()
      .then(newMessage => {
        res.send(newMessage);
      })
      .catch(error => {
        res.status(400).send(error);
      });
  } else {
    res.status(404).send();
  }
});


// Resolve (remove) help messages
router.delete('/api/admin/messages', (req, res) => {
  if (req.session.isLoggedIn && req.session.userType === UserTypes.Admin) {
    const id = req.body.id;

    HelpMessage.findByIdAndDelete(id)
      .then(message => {
        if (!message) {
          res.status(404).send();
        } else {
          res.send(message);
        }
      })
      .catch(error => {
        res.status(500).send(error);
      });
  }
});

module.exports = router;
