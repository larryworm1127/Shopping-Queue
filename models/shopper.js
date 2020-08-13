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
  return getShopperListHelper(this, username, 'favouriteStores', false);
};


ShopperSchema.statics.getSearchHistory = function (username) {
  return getShopperListHelper(this, username, 'searchHistory', true);
};


ShopperSchema.statics.getQueueHistory = function (username) {
  return getShopperListHelper(this, username, 'queueHistory', true);
};


const getShopperListHelper = function (Shopper, username, key, useMap) {
  return Shopper.findOne({ username }).then(shopper => {
    if (!shopper) {
      return Promise.reject();
    }

    const storeNames = (useMap) ? shopper[key].map((item) => item.store) : shopper[key];
    return Store.find({ username: { $in: storeNames } })
      .then((stores) => {
        return Promise.resolve(stores);
      });
  });
};


const Shopper = model('Shopper', ShopperSchema);

module.exports = {
  Shopper
};
