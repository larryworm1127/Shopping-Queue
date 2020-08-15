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
  viewHistory: [{
    store: { type: String, required: true },
    searchDate: { type: Date, required: true }
  }],
  queueHistory: [{
    store: { type: String, required: true },
    searchDate: { type: Date, required: true },
    queuedFor: { type: Date, required: true }
  }],
});


ShopperSchema.statics.getFavoriteStores = function (username) {
  const Shopper = this;

  return Shopper.findOne({ username }).then(shopper => {
    if (!shopper) {
      return Promise.reject();
    }

    return Store.find({ username: { $in: shopper.favouriteStores } })
      .then((stores) => {
        return Promise.resolve(stores);
      });
  });
};


ShopperSchema.statics.getViewHistory = function (username) {
  return Shopper.findOne({ username }).then(shopper => {
    if (!shopper) {
      return Promise.reject();
    }

    const storeNames = shopper.viewHistory.map((item) => item.store);
    return Store.find({ username: { $in: storeNames } }).then((stores) => {
      return Promise.resolve(shopper.viewHistory.map(({ searchDate, store, _id }) => {
        return {
          store: stores.find(storeDoc => storeDoc.username === store),
          searchDate,
          _id
        };
      }));
    });
  });
};


ShopperSchema.statics.getQueueHistory = function (username) {
  return Shopper.findOne({ username }).then(shopper => {
    if (!shopper) {
      return Promise.reject();
    }

    const storeNames = shopper.queueHistory.map((item) => item.store);
    return Store.find({ username: { $in: storeNames } }).then((stores) => {
      return Promise.resolve(shopper.queueHistory.map(({ store, searchDate, queuedFor, _id }) => {
        return {
          store: stores.find(storeDoc => storeDoc.username === store),
          _id,
          searchDate,
          queuedFor
        };
      }));
    });
  });
};


const Shopper = model('Shopper', ShopperSchema);

module.exports = {
  Shopper
};
