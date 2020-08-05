"use strict";
const express = require('express')

const app = express()

//app.use(express.static(__dirname + '/')) //change later

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");

/*
// To be implemented
const { Shopper } = require("./models/shopper");
const { Owner } = require("./models/owner");
const { Admin } = require("./models/admin");
*/

// to validate object IDs
const { ObjectID } = require("mongodb");

// Our own express middleware to check for
// an active user on the session cookie (indicating a logged in user.)
const sessionChecker = (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/login'); // redirect to login if not logged in.
    } else {
        next(); // next() moves on to the route.
    }
};

// middleware for mongo connection error for routes that need it
const mongoChecker = (req, res, next) => {
	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		res.status(500).send('Internal server error')
		return;
	} else {
		next()
	}
}

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
app.post('/login', mongoChecker, (req, res) => {
	const username = req.body.username
    const password = req.body.password
    const type = req.body.type

    // Use the static method on the User model to find a user
    // by their email and password
	User.findByUsernamePassword(username, password).then((user) => { //need to create function
	    if (!user) {
            res.redirect('/login');
        } else {
            // Add the user's id to the session cookie.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = user._id
            req.session.type = user.type
            req.session.email = user.email
            res.redirect('/');
        }
    }).catch((error) => {
    	// redirect to login if can't login for any reason
    	if (isMongoError(error)) {
			res.status(500).redirect('/login');
		} else {
			res.status(400).redirect('/login');
		}

    })
})

// A route to logout a user
app.get('/logout', (req, res) => {
	// Remove the session
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send(error)
		} else {
			res.redirect('/')
		}
	})
})

//Register a new user
app.post('/register', mongoChecker, (req, res) => {
    //New user is a shop owner
	if (req.body.type === 'Owner'){
	    const user = new Owner({
		    username: req.body.username,
		    email: req.body.email,
		    password: req.body.password,
		    storeName: req.body,storeName,
		    location: req.body.location,
		    custMaxNum: req.body.custMaxNum,
		    custMaxTime: req.body.custMaxTime,
		    openingTime: req.body.openingTime,
		    clostingTime: req.body.clostingTime,
		    storeType: req.body.storeType
	    })
	}
	//New user is a shopper
	else {
        const user = new Shopper({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address
            remindTime: req.body.remindTime
        })
    }
	// Save the user
	user.save().then((user) => {
		res.send(user)
	})
	.catch((error) => {
		if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // bad request for registering a user.
		}
	})
})

//Get profile for shopper, owner or admin
app.get("/profile", mongoChecker, (req, res) => {

    const id = req.body.id
    const type = req.body.type

    if (!ObjectID.isValid(id)) {
        res.status(404).send(); // if invalid id, definitely can't find resource, 404.
        return;
    }

    if (type === 'Owner')
        Owner.findById(id)
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
    }
    else if (type === 'Shopper'){
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
    }
    else {
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
app.get('/queues', mongoChecker, (req, res) => {

    const id = req.body.id
    const type = req.body.type

    if (!ObjectID.isValid(id)) {
        res.status(404).send(); // if invalid id, definitely can't find resource, 404.
        return;
    }

    if (type === 'Owner')
        Owner.findById(id)
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
    }
    else {
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

})

const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
})