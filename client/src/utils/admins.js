import { shoppers } from './shoppers';
import { stores } from './stores';


/**
 * Admin class used to store admin user profile data.
 * For phase 2, this would be used as a middleware for transforming
 * database data into front-end readable Javascript object.
 */
export class Admin {
  constructor(
    username,
    firstName,
    lastName,
    address,
    email,
  ) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.email = email;
  };

  /**
   * This function updates admin user profile data using given args.
   * It's called whenever user modifies profile data on profile page.
   */
  updateUserProfile = (
    firstName,
    lastName,
    address,
    email,
  ) => {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.email = email;
  };
}

// The array of admin objects would be replaced by database in phase 2.
const admins = [
  new Admin(
    'admin',
    'John',
    'Doe',
    '123 Admin Street, Toronto, ON',
    'admin@test.com',
  )
];

// The getAdmin() function would be replaced by a database query in phase 2.
export const getAdmin = (adminUsername) => {
  for (let i = 0; i < admins.length; i++) {
    if (admins[i].username === adminUsername) {
      return admins[i];
    }
  }
};


const createSupportMessage = (user, type, message, date, description) => {
  return { user, type, message, date, description };
};

export const supportMessages = [
  createSupportMessage(
    'Jon Chavez',
    'end user',
    'Issue with queuing',
    'Today 2:30PM',
    'Filler text'
  ),
  createSupportMessage(
    'No deals',
    'Shop owner',
    'Issue with deleting user',
    'Today 4:30PM',
    'Filler text'
  ),
  createSupportMessage(
    'Bestco',
    'Shop owner',
    'Issue with deleting seeing queue',
    'Yesterday 4:30PM',
    'Filler text'
  ),
  createSupportMessage(
    'Jim Joy',
    'end user',
    'Issue with deleting user',
    '06/20/2020',
    'Filler text'
  )
];
