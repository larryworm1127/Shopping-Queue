import { stores } from './stores';
import { Queue } from './queue';


// Shopper class used to store shopper user profile data.
// For phase 2, this would be used as a middleware for transforming
// database data into front-end readable Javascript object.
export class Shopper {
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

  /**
   * This function adds a <Queue> object into user profile data.
   * It's called whenever user queues up at a store.
   *
   * @param queue the queue object containing info about user's new queue.
   */
  queueUp = (queue) => {
    this.currentQueue.push(queue);
    this.queueHistory.push(queue);
  };

  /**
   * This function updates shopper user profile data using given args.
   * It's called whenever user modifies profile data on profile page.
   */
  updateUserProfile = (
    firstName,
    lastName,
    address,
    email,
    remindTime,
    favoriteStores
  ) => {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.email = email;
    this.remindTime = remindTime;
    this.favoriteStores = [...favoriteStores];
  };
}


// The array of shopper objects would be replaced by database in phase 2.
export const shoppers = [
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
    [
      new Queue('user', stores[0], '05-07-2020', 30, 1, new Date()),
      new Queue('user', stores[2], '08-07-2020', 20, 2, new Date())
    ]
  ),
  new Shopper(
    'user2',
    'Doe',
    'John',
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

// The getShopper() function would be replaced by a database query in phase 2.
export const getShopper = (username) => {
  for (let i = 0; i < shoppers.length; i++) {
    if (shoppers[i].username === username) {
      return shoppers[i];
    }
  }
};

// The addShopper() function would be replaced by a database query in phase 2.
// Currently called whenever a new shopper is registered on website.
export const addShopper = (
  username,
  firstName,
  lastName,
  address,
  email,
  remindTime
) => {
  const newShopper = new Shopper(
    username,
    firstName,
    lastName,
    address,
    email,
    remindTime,
    [],
    [],
    [],
    []
  );
  shoppers.push(newShopper);
};
