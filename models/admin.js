'use strict';

const mongoose = require('mongoose');
const validator = require('validator');


const Admin = mongoose.model('Admin', {
  username: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isAlphanumeric,
      message: 'Not valid username'
    }
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: 'Not valid email'
    }
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: validator.isAlpha,
      message: 'Not valid name'
    }
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: validator.isAlpha,
      message: 'Not valid name'
    }
  },
  address: {
    type: String,
    required: true,
    trim: true
  }
});


module.exports = {
  Admin
}
