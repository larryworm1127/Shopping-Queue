'use strict';

const mongoose = require('mongoose');
const validator = require('validator');


export const Shopper = mongoose.model('Shopper', {
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
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
  remindTime: {
    type: Number,
    required: true
  },
  favouriteStores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Store' }],
  searchHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Store', searchDate: { type: String, required: true } }],
  queueHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Store', searchDate: { type: String, required: true } }]
});
