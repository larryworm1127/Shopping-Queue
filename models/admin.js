
const mongoose = require('mongoose');
const Shopper = require('./user');
const Owner = require('./owner');

const Admin = mongoose.model('Admin', {
  username: {
    type: String,
    required: true,
    trim: true
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
  // email 
  viewableShoppers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Shopper'}],
  viewableStores: [{type: mongoose.Schema.Types.ObjectId, ref: 'Owner'}]
});

module.exports = { Admin };