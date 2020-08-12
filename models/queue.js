'use strict';

const mongoose = require('mongoose');
const validator = require('validator');


const Queue = mongoose.model('Queue', {
  username: {
    type: String,
    required: true,
    trim: true
  },
  store: {
    type: String,
    required: true,
    trim: true
  },
  datetime: {
    type: Date,
    required: true,
    trim: true,
    validate: {
      validator: validator.isDate,
      message: 'Not valid date'
    }
  },
  shopTime: {
    type: Number,
    required: true,
  },
  numCustomers: {
    type: Number,
    required: true
  },
  datetimeQueued: {
    type: Date,
    required: true,
    trim: true,
    validate: {
      validator: validator.isDate,
      message: 'Not valid date'
    }
  }
});

module.exports = { Queue };
