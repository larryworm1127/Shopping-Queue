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
    expires: 300000,
    httpOnly: true
  }
}));


// A route to login and create a session
app.post('/api/login', (req, res) => {
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


// Verify register account info
app.post('/api/verifyRegister', ((req, res) => {
  const { username, password, confirmPassword, userType } = req.body;

  User.verifyRegister(username, password, confirmPassword, userType)
    .then(() => res.send())
    .catch(errorMsg => res.status(400).send({ message: errorMsg }));
}));


// Register a new admin
// (requires secret passcode which will be embedded in env var in production)
app.post('/api/register/admin', (req, res) => {
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
app.post('/api/register', (req, res) => {

  const user = new User({
    username: req.body.username,
    password: req.body.password,
    userType: req.body.userType
  });

  const profile = (req.body.userType === UserTypes.Store) ?
    // New user is a store
    new Store({
      username: req.body.username,
      storeName: req.body.storeName,
      email: req.body.email,
      address: req.body.address,
      coordinate: req.body.coordinate,
      type: req.body.type,
      openingTime: req.body.openingTime,
      closingTime: req.body.closingTime,
      customerLimit: req.body.customerLimit,
      customerShopTime: req.body.customerShopTime
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

/*
Don't think we need routes to create an individual shopper or store
since we can now do this using the register path. Feel free to uncomment
and use if needed.

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

  const user = new Store({
      username: req.body.username,
      storeName: req.body.storeName,
      email: req.body.email,
      address: req.body.address,
      coordinate: req.body.coordinate,
      type: req.body.type,
      openingTime: req.body.openingTime,
      closingTime: req.body.closingTime,
      customerLimit: req.body.customerLimit,
      customerShopTime: req.body.customerShopTime
    });

  // Save the user and profile
  user.save()
    .then(() => {
      profile.save()
        .then(() => {
          res.send({});
        })
        .catch((error) => {
          res.status(400).send({ message: error });
        });
    })
    .catch((error) => {
      res.status(400).send({ message: error });
    });
});
*/

// Get profile for shopper
app.get('/api/shopper/:username', (req, res) => {

  const username = req.body.username;

  Shopper.findById({ username })
    .then(shopper => {
      if (!shopper) {
        res.status(404).send();
      } else {
        res.send(shopper);
      }
    })
    .catch(() => {
      res.status(500).send(); // server error
    });
});


// Update profile info for shopper
app.patch('/api/profile', (req, res) => {

  const id = req.body.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send();
    return;
  }

  // get the updated shopper profile.
  const shopper = {
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    address: req.body.address,
    remindTime: req.body.remindTime
  };


  // Update the shopper by its id.
  Shopper.findByIdAndUpdate(id, { $set: shopper }, { new: true })
    .then(shopper => {
      if (!shopper) {
        res.status(404).send();
      } else {
        res.send(shopper);
      }
    })
    .catch(error => {
      res.status(400).send();
    });
});

//Add store to favorites
app.patch('/api/profile/favorites', (req, res) => {

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
            { "_id": shopperID },
            {$push: {"favouriteStores": store}

        }).then(result => {
            if (!result) {
                res.status(404).send('Resource not found')
            }
            else{
                Shopper.findById(shopperID).then(shopper => {
                    res.send(shopper)
                })
            }
        })
      }
    })
    .catch(error => {
      res.status(500).send(); // server error
    });
});

//Add store from favorites
app.delete('/api/profile/favorites', (req, res) => {

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
            {"_id": shopperID},
            {$pull: {"favouriteStores": store._id}}
        ).then(result => {
            Shopper.findById(shopperID).then(shopper => {
                res.send(shopper)
            })
        })
    }).catch(error => {
        res.status(500).send(); // server error
    });

});

//Delete a shoppers account
app.delete('/api/profile', (req, res) => {
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
                    res.send({"Shopper": shopper});
                })
            }
        })
        .catch(error => {
            res.status(500).send(); // server error, could not delete.
        });
});


//Get profile for store owner
app.get('/api/store/:username', (req, res) => {
  const username = req.params.username;

  Store.findOne({ username })
    .then(store => {
      if (!store) {
        res.status(404).send();
      } else {
        res.send(store);
      }
    })
    .catch(() => {
      res.status(500).send(); // server error
    });
});


//Update profile info for store owner
app.patch('/api/store/profile', (req, res) => {

  const id = req.body.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send();
    return;
  }

  // get the updated store profile.
  const store = {
    username: req.body.username,
    email: req.body.email,
    storeName: req.body.storeName,
    address: req.body.address,
    coordinate: req.body.coordinate,
    type: req.body.type,
    customerLimit: req.body.customerLimit,
    customerShopTime: req.body.customerShopTime,
    openingTime: req.body.openingTime,
    closingTime: req.body.closingTime,
  };

  // Update the store by its id.
  Store.findByIdAndUpdate(id, { $set: store }, { new: true })
    .then(store => {
      if (!store) {
        res.status(404).send();
      } else {
        res.send(store);
      }
    })
    .catch(() => {
      res.status(400).send(); // bad request for changing the student.
    });
});

//Delete a store owners account
app.delete('/api/store/profile', (req, res) => {
    const id = req.body.id;

    // Validate id
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    // Delete the store and the user attached to the store
    Store.findByIdAndRemove(id)
        .then(store => {
            if (!store) {
                res.status(404).send();
            } else {
                User.remove({ username: store.username })
                .then(user => {
                    res.send({"Store": store});
                })
            }
        })
        .catch(error => {
            res.status(500).send(); // server error, could not delete.
        });
});


//Get profile for admin
app.get('/api/admin/:username', (req, res) => {
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


//Update profile info for admin
app.patch('/api/admin/profile', (req, res) => {

  const id = req.body.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send();
    return;
  }

  // get the updated store profile.
  const body = {
    username: req.body.username,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
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
    .catch(() => {
      res.status(400).send(); // bad request for changing the student.
    });
});

//Delete an admins account
app.delete('/api/admin/profile', (req, res) => {
    const id = req.body.id;

    // Validate id
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    // Delete the admin and the user attached to the admin
    Admin.findByIdAndRemove(id)
        .then(admin => {
            if (!admin) {
                res.status(404).send();
            } else {
                User.remove({ username: admin.username })
                .then(user => {
                    res.send({"Admin": admin});
                })
            }
        })
        .catch(error => {
            res.status(500).send(); // server error, could not delete.
        });
});

//Add new booking for shopper
app.post('/api/queue', (req, res) => {

    // Create a new queue
    const queue = new Queue({
        username: req.body.username,
        store: req.body.store,
        date: req.body.date,
        shopTime: req.body.shopTime,
        numCustomers: req.body.numCustomers,
        dateTimeQueued: req.body.dateTimeQueued
    });

    // Save queue to the database and add to shopper queue history
    queue.save().then(
        result1 => {
            Shopper.updateOne(
            {"username": req.body.username},
            {$push: {"queueHistory": queue}}
            ).then((result2) => {
                Shopper.find( {username: req.body.username} )
                .then((result3) => {
                    res.send({ "Shopper": result3, "Queue": result1 });
                })
            })
        },
        error => {
            res.status(400).send(error); // 400 for bad request
        }
    );
});


// Get queues for shopper
app.get('/api/queue', (req, res) => {

  const userNam = req.body.username;

  Queue.find({ username: userNam })
    .then(queues => {
      if (!queues) {
        res.status(404).send();
      } else {
        res.send(queues);
      }
    })
    .catch(() => {
      res.status(500).send(); // server error
    });

});

//Remove a queue
app.delete('/api/queue', (req, res) => {
    const id = req.body.id;

    // Validate id
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    // Delete a queue by its id
    Queue.findByIdAndRemove(id)
        .then(queue => {
            if (!queue) {
                res.status(404).send();
            } else {
                res.send(queue);
            }
        })
        .catch(error => {
            res.status(500).send(); // server error, could not delete.
        });
});

// Get queues for store
app.get('/api/store/queue', (req, res) => {

  const storeNam = req.body.store;

  Queue.find({ store: storeNam })
    .then(queues => {
      if (!queues) {
        res.status(404).send();
      } else {
        res.send(queues);
      }
    })
    .catch(() => {
      res.status(500).send(); // server error
    });
});


// Get queues for admin (gets all queues)
app.get('/api/admin/queue', (req, res) => {

  Queue.find()
    .then(queues => {
      if (!queues) {
        res.status(404).send();
      } else {
        res.send(queues);
      }
    })
    .catch(() => {
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

// Get store by ID
app.get('/api/store/:id', (req, res) => {

  const id = req.params.id

  Store.findById(id)
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
    '/admin/store/queues',
    '/admin/shopper/queues',
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
