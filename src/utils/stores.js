class Store {
  constructor(
    id,
    name,
    username,
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

  addNewQueue = (queue) => {
    this.currentQueue.push(queue)
  }
}


export const StoreTypes = {
  GROCERY: 'Grocery',
  DEPARTMENT: 'Department',
  CLOTHING: 'Clothing',
  ACCESSORY: 'Accessory',
};


export const stores = [
  new Store(
    0,
    'Floor Mart',
    'store1',
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
    '000 Street, Toronto, ON',
    [43.661915, -79.379381],
    StoreTypes.GROCERY,
    '07:00',
    '21:00',
    20,
    30
  ),
];


export const getStore = (storeId) => {
  for (let i = 0; i < stores.length; i++) {
    if (stores[i].id === storeId) {
      return stores[i];
    }
  }
}
