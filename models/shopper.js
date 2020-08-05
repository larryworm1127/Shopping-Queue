const mongoose = require('mongoose');

const User = mongoose.model('User', {
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  remindTime: {
    type: Number,
    required: true
  }
  // currentQueue,
  // favouriteStores,
  // searchHistory,
  // queueHistory
});

