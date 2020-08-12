'use strict';

const mongoose = require('mongoose');
const validator = require('validator');


const HelpMessage = mongoose.model('HelpMessage', {
  username: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    validate: {
      validator: validator.isAlphanumeric,
      message: 'Not valid username'
    }
  },
  userType: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    minlength: 1,
    required: true
  },
  description: {
    type: String,
    minlength: 1,
    required: true
  },
  date: {
    type: Date,
    required: true,
    validate: {
      validator: validator.isDate,
      message: 'Not valid date'
    }
  }
});

module.exports = { HelpMessage };
