'use strict';

const mongoose = require('mongoose');
const { isAlphanumeric, isEmail } = require('validator');


const Store = mongoose.model('Store', {
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
  storeName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: isEmail,
      message: 'Not valid email'
    }
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  coordinate: {
    type: [Number],
    validate: [(arr) => {
      return (arr.length === 2);
    }]
  },
  type: {
    type: String,
    required: true,
    trim: true
  },
  openingTime: {
    type: String,
    required: true,
    trim: true
  },
  closingTime: {
    type: String,
    required: true,
    trim: true
  },
  customerLimit: {
    type: Number,
    required: true
  },
  customerShopTime: {
    type: Number,
    required: true
  }
});


module.exports = {
  Store
};
