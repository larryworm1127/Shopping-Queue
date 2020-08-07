'use strict'

const mongoose = require('mongoose');

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
  date: {
    type: String,
    required: true,
    trim: true
  },
  shopTime: {
    type: Number,
    required: true,
  },
  numCustomers: {
    type: Number,
    required: true
  },
  dateTimeQueued: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = { Queue };