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
const { Queue } = require('./models/queue');
const { HelpMessage } = require('./models/helpMessage');

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

  const user = new User({
    username: req.body.username,
    password: req.body.password,
    userType: req.body.registerAs
  });

/*
  const profile = (req.body.type === UserTypes.Store) ?
    // New user is a shopper
    new Store({
*/
  // Save the user
  user.save().then(
    (user) => {
      res.send(user);
    },
    (error) => {
      res.status(400).send(error);
    }
  );
});

//Create a new shopper
app.post('/api/shopper', (req, res) => {

  const user =
    new Shopper({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      address: req.body.address,
      remindTime: req.body.remindTime,
      favouriteStores: [],
      searchHistory: [],
      queueHistory: []
    });

  // Save the user
  user.save().then(
    (user) => {
      res.send(user);
    },
    (error) => {
      res.status(400).send(error);
    }
  );
});

//Create a new store
app.post('/api/store', (req, res) => {

  const user =
    new Shopper({
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


//Get profile for shopper
app.get('/api/profile', (req, res) => {

  const id = req.body.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send(); // if invalid id, definitely can't find resource, 404.
    return;
  }

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
});


// Update profile for shopper
app.patch('/api/profile', (req, res) => {

  const id = req.body.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send();
    return;
  }

  // get the updated store profile.
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    address: req.body.address,
    remindTime: req.body.remindTime
  };

  // Update the admin by its id.
  Shopper.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(shopper => {
      if (!shopper) {
        res.status(404).send();
      } else {
        res.send(shopper);
      }
    })
    .catch(error => {
      res.status(400).send(); // bad request for changing the student.
    });
});


//Get profile for store owner
app.get('/api/store/profile', (req, res) => {

  const id = req.body.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send(); // if invalid id, definitely can't find resource, 404.
    return;
  }

  Store.findById(id)
    .then(store => {
      if (!store) {
        res.status(404).send();
      } else {
        res.send(store);
      }
    })
    .catch(error => {
      res.status(500).send(); // server error
    });
});


//Update store owner profile
app.patch('/api/store/profile', (req, res) => {

  const id = req.body.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send();
    return;
  }

  // get the updated store profile.
  const body = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    storeName: req.body.storeName,
    location: req.body.location,
    customerLimit: req.body.customerLimit,
    customerShopTime: req.body.customerShopTime,
    openingTime: req.body.openingTime,
    closingTime: req.body.closingTime,
    storeType: req.body.storeType
  };

  // Update the store by its id.
  Store.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(store => {
      if (!store) {
        res.status(404).send();
      } else {
        res.send(store);
      }
    })
    .catch(error => {
      res.status(400).send(); // bad request for changing the student.
    });
});


//Get profile for admin
app.get('/api/admin/profile', (req, res) => {

  const id = req.body.id

  if (!ObjectID.isValid(id)) {
    res.status(404).send(); // if invalid id, definitely can't find resource, 404.
    return;
  }

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
});


//Update admin profile
app.patch('/api/admin/profile', (req, res) => {

  const id = req.body.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send();
    return;
  }

  // get the updated store profile.
  const body = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lasatName,
    address: req.body.address
  };

  // Update the admin by its id.
  Admin.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(admin => {
      if (!admin) {
        res.status(404).send();
      } else {
        res.send(admin);
      }
    })
    .catch(error => {
      res.status(400).send(); // bad request for changing the student.
    });
});


// Get queues for shopper
app.get('/api/queues', (req, res) => {

  const id = req.body.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send(); // if invalid id, definitely can't find resource, 404.
    return;
  }

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

});


// Get queues for store owner
app.get('/api/store/queues', (req, res) => {

  const id = req.body.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send(); // if invalid id, definitely can't find resource, 404.
    return;
  }

  Store.findById(id)
    .then(store => {
      if (!store) {
        res.status(404).send();
      } else {
        res.send(store.currentQueues);
      }
    })
    .catch(error => {
      res.status(500).send(); // server error
    });

});


// Get queues for admin
app.get('/api/admin/queues', (req, res) => {

  const id = req.body.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send(); // if invalid id, definitely can't find resource, 404.
    return;
  }

  Admin.findById(id)
    .then(admin => {
      if (!admin) {
        res.status(404).send();
      } else {
        res.send(admin.currentQueues);
      }
    })
    .catch(error => {
      res.status(500).send(); // server error
    });

});


// Get all stores for map
app.get('/api/map', (req, res) => {

  Store.find()
    .then(store => {
      res.send(store);
    })
    .catch(error => {
      res.status(500).send(error); // server error
    });
});


// Get all messages
app.get('/api/admin/messages', (req, res) => {

  HelpMessage.find()
    .then(message => {
      res.send(message);
    })
    .catch(error => {
      res.status(500).send(error); // server error
    });
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
