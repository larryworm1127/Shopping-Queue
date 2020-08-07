'use strict';

// External libraries import
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const { ObjectID } = require('mongodb');

// Models import
const { User } = require('./models/user');
const { Shopper } = require('./models/shopper');
const { Store } = require('./models/store');
const { Admin } = require('./models/admin')
const { Queue } = require('./models/queue')
const { HelpMessage } = require('./models/helpMessage')


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
    expires: 60000,
    httpOnly: true
  }
}));

// A route to login and create a session
app.post('api/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const type = req.body.type;

  User.verifyCredential(username, password, type)
    .then((user) => {
      if (!user) {
        res.redirect('/login');
      } else {
        req.session.userId = user._id;
        req.session.type = user.type;
        req.session.user = user.username;
        res.redirect('/');
      }
    })
    .catch(() => {
      res.status(400).redirect('/login');
    });
});


// A route to logout a user
app.get('api/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.redirect('/');
    }
  });
});

//Register a new user
app.post('api/register', (req, res) => {

  const user = (req.body.type === 'Owner') ?
    // New user is a store owner
    new Store({
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
    }) :
    // New user is a shopper
    new Shopper({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      remindTime: req.body.remindTime
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

//Get profile for shopper
app.get('api/profile', (req, res) => {

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

//Update profile for shopper
app.patch('api/profile', (req, res) => {

    const id = req.body.id

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    // get the updated store profile.
    const body = {
        'firstName': req.body.firstName,
        'lastName': req.body.lasatName,
        'address': req.body.address,
        'email': req.body.email,
        'remindTime': req.body.remindTime
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

//Get profile for store owner
app.get('api/store/profile', (req, res) => {

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
app.patch('api/store/profile', (req, res) => {

    const id = req.body.id

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    // get the updated store profile.
    const body = {
        'username': req.body.username,
        'email': req.body.email,
        'password': req.body.password,
        'storeName': req.body.storeName,
        'location': req.body.location,
        'customerLimit': req.body.customerLimit,
        'customerShopTime': req.body.customerShopTime,
        'openingTime': req.body.openingTime,
        'closingTime': req.body.closingTime,
        'storeType': req.body.storeType
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
app.get('api/admin/profile', (req, res) => {

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
        res.send(admin);
      }
    })
    .catch(error => {
      res.status(500).send(); // server error
    });
});

//Update admin profile
app.patch('api/admin/profile', (req, res) => {

    const id = req.body.id

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    // get the updated store profile.
    const body = {
        'email': req.body.email,
        'firstName': req.body.firstName,
        'lastName': req.body.lasatName,
        'address': req.body.address
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
app.get('api/queues', (req, res) => {

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
app.get('api/store/queues', (req, res) => {

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
app.get('api/admin/queues', (req, res) => {

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
app.get('api/map', (req, res) => {

  Store.find()
    .then(store => {
      res.send(store);
    })
    .catch(error => {
      res.status(500).send(error); // server error
    });
});

// Get all messages
app.get('api/admin/messages', (req, res) => {

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
