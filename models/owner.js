const mongoose = require('mongoose');

const Owner = mongoose.model('Owner', {
  storeId: {
    type: Number,
    required: true
  },
  storeName: {
    type: String,
    required: true,
    trime: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  // email.
  address: {
    type: String,
    required: true,
    trim: true
  },
  coordinate: {type: [Number], validate: [lengthTwo]},
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
})

function lengthTwo(arr) { return (arr.length === 2); }

module.exports = { Owner };