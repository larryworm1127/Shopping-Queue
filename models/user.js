/* User model */
'use strict';

const { model, Schema } = require('mongoose');
const { isAlphanumeric } = require('validator');
const { genSalt, hash, compare } = require('bcryptjs');


const UserTypes = {
  Shopper: 0,
  Store: 1,
  Admin: 2
};

// Error messages
const incorrectCred = 'Incorrect username or password!';
const notRegistered = 'User is not registered!';


const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    validate: {
      validator: isAlphanumeric,
      message: 'Not valid username'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 4
  },
  userType: {
    type: Number,
    required: true
  }
});

UserSchema.index({ username: 1, userType: 1 }, { unique: true });


UserSchema.pre('save', function (next) {
  const user = this; // binds this to User document instance

  if (user.isModified('password')) {
    genSalt(10, (err, salt) => {
      hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});


UserSchema.statics.verifyCredential = function (username, password, type) {
  const User = this;

  return User.findOne({ username: username, userType: type }).then((user) => {
    if (!user) {
      return Promise.reject(notRegistered);
    }
    return new Promise((resolve, reject) => {
      compare(password, user.password, (err, result) => {
        (result) ? resolve(user) : reject(incorrectCred);
      });
    });
  });
};


const User = model('User', UserSchema);

module.exports = {
  UserTypes,
  User
};
