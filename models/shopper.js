'use strict';

const { model, Schema } = require('mongoose');
const { isAlphanumeric, isEmail } = require('validator');


const ShopperSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: isAlphanumeric,
      message: 'Not valid username'
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
  email: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: isEmail,
      message: 'Not valid email'
    }
  },
  remindTime: {
    type: Number,
    required: true
  },
  favouriteStores: [{ type: Schema.Types.ObjectId, ref: 'Store' }],
  searchHistory: [{ type: Schema.Types.ObjectId, ref: 'Store', searchDate: { type: String, required: true } }],
  queueHistory: [{ type: Schema.Types.ObjectId, ref: 'Queue', searchDate: { type: String, required: true } }],
});


const Shopper = model('Shopper', ShopperSchema);

module.exports = {
  Shopper
};
