import { stores } from './stores';

class Shopper {
  constructor(
    username,
    firstName,
    lastName,
    address,
    email,
    remindTime,
    favoriteStores,  // phase 1 only
    searchHistory,  // phase 1 only
    queueHistory,  // testing only
  ) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.email = email;
    this.favoriteStores = [...favoriteStores];
    this.searchHistory = [...searchHistory];
    this.queueHistory = [...queueHistory];
    this.remindTime = remindTime;
  }
}


const shoppers = [
  new Shopper(
    'user',
    'John',
    'Doe',
    '123 Test Street, Toronto, ON',
    'user@test.com',
    30,
    [stores[0], stores[1]],
    [],
    []
  ),
  new Shopper(
    'user2',
    'John',
    'Doe',
    '123 Test Street, Toronto, ON',
    'user2@test.com',
    45,
    [stores[1], stores[3]],
    [],
    []
  )
];

export const getShopper = (username) => {
  for (let i = 0; i < shoppers.length; i++) {
    if (shoppers[i].username === username) {
      return shoppers[i];
    }
  }
};
