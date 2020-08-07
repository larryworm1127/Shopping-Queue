'use strict';

const mongoose = require('mongoose');
const validator = require('validator');


const Admin = mongoose.model('Admin', {
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
  viewableShoppers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shopper' }],
  viewableStores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Store' }]
});


module.exports = {
  Admin
}
