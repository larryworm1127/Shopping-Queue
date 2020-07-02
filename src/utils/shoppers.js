import { stores } from './stores';

class Shopper {
  constructor(
    username,
    firstName,
    lastName,
    address,
    email,
    remindTime,
    currentQueue,  // testing only
    favoriteStores,  // phase 1 only
    searchHistory,  // phase 1 only
    queueHistory,  // testing only
  ) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.email = email;
    this.currentQueue = [...currentQueue];
    this.favoriteStores = [...favoriteStores];
    // Since search feature isn't implemented for phase 1
    // Below hardcoded data list is used for current data display
    // Search history data will be accessed from external source in phase 2
    this.searchHistory = [...searchHistory];
    this.queueHistory = [...queueHistory];
    this.remindTime = remindTime;
  }

  queueUp = (queue) => {
    this.currentQueue.push(queue);
    this.queueHistory.push(queue);
  };
}


const shoppers = [
  new Shopper(
    'user',
    'John',
    'Doe',
    '123 Test Street, Toronto, ON',
    'user@test.com',
    30,
    [],
    [stores[0], stores[1]],
    [
      { store: stores[0], date: '02-05-2020' },
      { store: stores[0], date: '08-05-2020' },
      { store: stores[1], date: '15-05-2020' }
    ],
    []
  ),
  new Shopper(
    'user2',
    'John',
    'Doe',
    '123 Test Street, Toronto, ON',
    'user2@test.com',
    45,
    [],
    [stores[0], stores[1], stores[2], stores[3]],
    [
      { store: stores[0], date: '02-05-2020' },
      { store: stores[0], date: '08-05-2020' },
      { store: stores[1], date: '15-05-2020' },
      { store: stores[3], date: '22-05-2020' },
      { store: stores[2], date: '17-06-2020' }
    ],
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
