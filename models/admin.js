'use strict';

const mongoose = require('mongoose');
const { isAlphanumeric, isEmail } = require('validator');


const Admin = mongoose.model('Admin', {
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
  email: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: isEmail,
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
