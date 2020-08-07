'use strict';

// External libraries import
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const { ObjectID } = require('mongodb');
const { mongoose } = require('./db/mongoose');
mongoose.set('useFindAndModify', false);

// Models import
const { User, UserTypes } = require('./models/user');
const { Shopper } = require('./models/shopper');
const { Store } = require('./models/store');
const { Admin } = require('./models/admin');


// Create main express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Create a session cookie
app.use(session({
  secret: 'oursecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 3600000,
    httpOnly: true
  }
}));

// A route to login and create a session
app.post('/api/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const userType = req.body.userType;

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
app.get('/api/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.redirect('/');
    }
  });
});


// A route to check if a use is logged in on the session cookie
app.get('/api/check-session', (req, res) => {
  if (req.session.username) {
    res.send({ currentUser: req.session.username, userType: req.session.userType });
  } else {
    res.status(401).send();
  }
});


// Register a new user
app.post('/api/register', (req, res) => {

  console.log(req.body);
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    userType: req.body.registerAs
  });

  const profile = (req.body.type === UserTypes.Store) ?
    // New user is a shopper
    new Store({
      username: req.body.username,
      email: req.body.email,
      storeName: req.body.storeName,
      location: req.body.location,
      customerLimit: req.body.customerLimit,
      customerShopTime: req.body.customerShopTime,
      openingTime: req.body.openingTime,
      closingTime: req.body.closingTime,
      storeType: req.body.storeType
    }) :
    // New user is a store owner
    new Shopper({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      email: req.body.email,
      remindTime: req.body.remindTime,
      favouriteStores: [],
      searchHistory: [],
      queueHistory: []
    });

  // Save the user and profile
  user.save()
    .then((user) => {
      profile.save().then((profile) => {
        res.send({ profile: profile, user: user });
      }).catch((error) => {
        console.log(error);
        res.status(400).send({ message: error });
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send({ message: error });
    });
});


// Get profile for shopper, owner or admin
app.get('/api/profile', (req, res) => {

  const id = req.body.id;
  const type = req.body.type;

  if (!ObjectID.isValid(id)) {
    res.status(404).send(); // if invalid id, definitely can't find resource, 404.
    return;
  }

  if (type === 'Owner') {
    Store.findById(id)
      .then(owner => {
        if (!owner) {
          res.status(404).send();
        } else {
          res.send(owner);
        }
      })
      .catch(error => {
        res.status(500).send(); // server error
      });
  } else if (type === 'Shopper') {
    Shopper.findById(id)
      .then(shopper => {
        if (!shopper) {
          res.status(404).send();
        } else {
          res.send(shopper);
        }
      })
      .catch(error => {
        res.status(500).send(); // server error
      });
  } else {
    Admin.findById(id)
      .then(admin => {
        if (!admin) {
          res.status(404).send();
        } else {
          res.send(admin);
        }
      })
      .catch(error => {
        res.status(500).send(); // server error
      });
  }
});


// Get queues for shopper or queues for owners store
app.get('/api/queues', (req, res) => {

  const id = req.body.id;
  const type = req.body.type;

  if (!ObjectID.isValid(id)) {
    res.status(404).send(); // if invalid id, definitely can't find resource, 404.
    return;
  }

  if (type === 'Owner') {
    Store.findById(id)
      .then(owner => {
        if (!owner) {
          res.status(404).send();
        } else {
          res.send(owner.currentQueues);
        }
      })
      .catch(error => {
        res.status(500).send(); // server error
      });
  } else {
    Shopper.findById(id)
      .then(shopper => {
        if (!shopper) {
          res.status(404).send();
        } else {
          res.send(shopper.currentQueues);
        }
      })
      .catch(error => {
        res.status(500).send(); // server error
      });
  }
});


/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(__dirname + '/client/build'));

// All routes other than above will go to index.html
app.get('*', (req, res) => {
  // check for page routes that we expect in the frontend to provide correct status code.
  const goodPageRoutes = [
    '/',
    '/map',
    '/queue',
    '/profile',
    '/store/profile',
    '/admin/profile',
    '/admin/queues',
    '/admin/messages',
    '/store/queues',
    '/store/shoppers',
    '/login',
    '/register',
    '/logout',
    '/store/:id'
  ];
  if (!goodPageRoutes.includes(req.url)) {
    res.status(404);
  }

  // send index.html
  res.sendFile(__dirname + '/client/build/index.html');
});


/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
