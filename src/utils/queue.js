import { stores } from './stores';

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
}

export let bookings = [
  new Queue('user', stores[2], 'Friday, June 26th @ 7pm', 30, 1, new Date()),
  new Queue('user', stores[0], 'Monday, June 29th @ 10am', 50, 2, new Date()),
  new Queue('user', stores[1], 'Thursday, July 3rd @ 10am', 10, 1, new Date())
];

export const getBookings = () => {
  return bookings;
};


// Function to add a booking
export const addBooking = b => {
  bookings.push(b);
};


export const removeBooking = (queue, b) => {
  const filteredBookings = bookings.filter(s => {
    return s !== b;
  });

  bookings = filteredBookings;

  queue.setState({
    bookings: filteredBookings
  });
};



