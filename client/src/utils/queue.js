export class Queue {
  constructor(
    username,
    store,
    date,
    shopTime,
    numCustomer,
    dateTimeQueued,
  ) {
    this.username = username;
    this.store = store;
    this.date = date;
    this.shopTime = shopTime;
    this.numCustomer = numCustomer;
    this.dateTimeQueued = dateTimeQueued;
    this.position = Math.floor(1 + Math.random() * 49);
  }

  getTimeQueued = () => {
    return this.dateTimeQueued.toLocaleString();
  };

  updateQueue = (date, shopTime, numCustomer) => {
    this.date = date;
    this.shopTime = shopTime;
    this.numCustomer = numCustomer;
  };
}
