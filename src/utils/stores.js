export const Store = function (
  id,
  name,
  address,
  coordinate,
  type,
  openingTime,
  closingTime,
  customerLimit,
  customerShopTime
) {
  this.id = id;
  this.name = name;
  this.address = address;
  this.coordinate = coordinate;
  this.type = type;
  this.openingTime = openingTime;
  this.closingTime = closingTime;
  this.customerLimit = customerLimit;
  this.customerShopTime = customerShopTime;
  this.queue = [];
};


export const Queue = function (
  username,
  date,
  shopTime,
  numCustomer,
  timeQueued,
  dateQueued
) {
  this.username = username;
  this.date = date;
  this.shopTime = shopTime;
  this.numCustomer = numCustomer;
  this.timeQueued = timeQueued;
  this.dateQueued = dateQueued;
};


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
    '123 Street',
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
    '456 Street',
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
    '789 Street',
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
    '000 Street',
    [43.661915, -79.379381],
    StoreTypes.GROCERY,
    '07:00',
    '21:00',
    20,
    30
  ),
];
