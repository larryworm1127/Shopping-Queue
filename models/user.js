/* User model */
'use strict';

const { model, Schema } = require('mongoose');
const { isAlphanumeric } = require('validator');
const bcrypt = require('bcryptjs');


const UserTypes = {
  Shopper: 0,
  Store: 1,
  Admin: 2
};


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
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
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
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        (result) ? resolve(user) : reject();
      });
    });
  });
};


const User = model('User', UserSchema);

module.exports = {
  UserTypes,
  User
}
