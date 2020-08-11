'use strict';

// External libraries import
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const { mongoose } = require('./db/mongoose');
mongoose.set('useFindAndModify', false);

// Routes import
const auth = require('./api/auth');
const admin = require('./api/admin');
const shopper = require('./api/shopper');
const store = require('./api/store');
const queue = require('./api/queue');

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


// Use express routers
app.use('/', auth);
app.use('/', admin);
app.use('/', shopper);
app.use('/', store);
app.use('/', queue);


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
