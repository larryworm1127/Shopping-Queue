export class Store {
  constructor(
    id,
    name,
    username,
    email,
    address,
    coordinate,
    type,
    openingTime,
    closingTime,
    customerLimit,
    customerShopTime
  ) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.email = email;
    // Coordinates and addresses are hardcoded for phase 1.
    // Google Place API will be used for phase 2 to assists with the map feature
    // and allow more dynamic coordinate for stores.
    this.address = address;
    this.coordinate = coordinate;
    this.type = type;
    this.openingTime = openingTime;
    this.closingTime = closingTime;
    this.customerLimit = customerLimit;
    this.customerShopTime = customerShopTime;
    this.currentQueue = [];
  }

  /**
   * This function adds a <Queue> object into store queue list.
   * It's called whenever a user queues up at current store.
   *
   * @param queue the queue object containing info about the new queue.
   */
  addNewQueue = (queue) => {
    this.currentQueue.push(queue);
  };
}


/**
 * A Enum object that contains all store types.
 *
 * @type {{CLOTHING: string, ACCESSORY: string, DEPARTMENT: string, GROCERY: string}}
 */
export const StoreTypes = {
  GROCERY: 'Grocery',
  DEPARTMENT: 'Department',
  CLOTHING: 'Clothing',
  ACCESSORY: 'Accessory',
};


// The array of store objects would be replaced by database in phase 2.
export const stores = [
  new Store(
    0,
    'Floor Mart',
    'store1',
    'store1@test.com',
    '123 Street, Toronto, ON',
    [43.658702, -79.397168],
    StoreTypes.CLOTHING,
    '10:00',
    '18:30',
    10,
    30
  ),
  new Store(
    1,
    'Shoppers Not Drug Mart',
    'store2',
    'store2@test.com',
    '456 Street, Toronto, ON',
    [43.660896, -79.385397],
    StoreTypes.DEPARTMENT,
    '11:00',
    '19:30',
    15,
    50
  ),
  new Store(
    2,
    'Yes Frills',
    'store3',
    'store3@test.com',
    '789 Street, Toronto, ON',
    [43.658662, -79.390168],
    StoreTypes.GROCERY,
    '08:00',
    '20:30',
    30,
    40
  ),
  new Store(
    3,
    'Unfreshco',
    'store4',
    'store4@test.com',
    '000 Street, Toronto, ON',
    [43.661915, -79.379381],
    StoreTypes.GROCERY,
    '07:00',
    '21:00',
    20,
    30
  ),
];


// The getStore() function would be replaced by a database query in phase 2.
export const getStore = (storeId) => {
  for (let i = 0; i < stores.length; i++) {
    if (stores[i].id === parseInt(storeId)) {
      return stores[i];
    }
  }
};

export const getStoreByUsername = (username) => {
  for (let i = 0; i < stores.length; i++) {
    if (stores[i].username === username) {
      return stores[i];
    }
  }
};


// The addStore() function would be replaced by a database query in phase 2.
// Currently called whenever a new store owner is registered on website.
export const addStore = (
  name,
  username,
  address,
  email,
  coordinate,
  type,
  openingTime,
  closingTime,
  customerLimit,
  customerShopTime
) => {
  const newStore = new Store(
    stores.length,
    name,
    username,
    email,
    address,
    coordinate,
    type,
    openingTime,
    closingTime,
    customerLimit,
    customerShopTime
  );
  stores.push(newStore);
};
