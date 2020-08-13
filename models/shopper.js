'use strict';

const { model, Schema } = require('mongoose');
const { isAlphanumeric, isEmail } = require('validator');
const { Store } = require('./store');


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
  favouriteStores: [{ type: String }],
  searchHistory: [{ store: { type: String }, searchDate: { type: String, required: true } }],
  queueHistory: [{ store: { type: String }, searchDate: { type: String, required: true } }],
});


ShopperSchema.statics.getFavoriteStores = function (username) {
  const Shopper = this;

  return Shopper.findOne({ username }).then(shopper => {
    if (!shopper) {
      return Promise.reject();
    }

    return Store.find({ username: { $in: shopper.favouriteStores }})
      .then((stores) => {
        return Promise.resolve(stores)
      })
  });
};


const Shopper = model('Shopper', ShopperSchema);

module.exports = {
  Shopper
};
