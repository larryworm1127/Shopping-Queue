const mongoose = require('mongoose');

const HelpMessage = mongoose.model('HelpMessage', {
  header: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  }
});

module.exports = { HelpMessage };
