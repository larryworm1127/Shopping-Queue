const mongoose = require('mongoose');
const Owner = require('./owner');

const User = mongoose.model('User', {
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
  // email: {
  //   type: String,
  //   required: true
  // },
  remindTime: {
    type: Number,
    required: true
  },
  favouriteStores: [{type: mongoose.Schema.Types.ObjectId, ref: 'Owner'}],
  searchHistory: [{type: mongoose.Schema.Types.ObjectId, ref: 'Owner', searchDate: {type: String, required: true}}],
  queueHistory: [{type: mongoose.Schema.Types.ObjectId, ref: 'Owner', searchDate: {type: String, required: true}}]
});

module.exports = { User };
