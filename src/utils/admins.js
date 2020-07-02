import { shoppers } from './shoppers';
import { stores } from './stores';

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

const admins = [
  new Admin(
    'admin',
    'John',
    'Doe',
    '123 Admin Stree, Toronto, ON',
    'admin@test.com',
    shoppers,
    stores
  )
];

export const getAdmin = (adminUsername) => {
  for (let i = 0; i < admins.length; i++) {
    if (admins[i].username === adminUsername) {
      return admins[i];
    }
  }
}
