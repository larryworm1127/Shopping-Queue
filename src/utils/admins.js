import { shoppers } from './shoppers';
import { stores } from './stores';


// Admin class used to store admin user profile data.
// For phase 2, this would be used as a middleware for transforming
// database data into front-end readable Javascript object.
export class Admin {
  constructor(
    username,
    firstName,
    lastName,
    address,
    email,
    viewableShoppers,
    viewableStores,
  ) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.email = email;
    this.viewableShoppers = viewableShoppers;
    this.viewableStores = viewableStores;
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
    shoppers,
    stores
  )
];

// The getAdmin() function would be replaced by a database query in phase 2.
export const getAdmin = (adminUsername) => {
  for (let i = 0; i < admins.length; i++) {
    if (admins[i].username === adminUsername) {
      return admins[i];
    }
  }
}
