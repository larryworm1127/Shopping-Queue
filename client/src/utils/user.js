'use strict';


export const UserType = {
  shopper: 0,
  store: 1,
  admin: 2
};


export const getUserTypeText = (userType) => {
  switch (userType) {
    case 0:
      return 'Shopper';
    case 1:
      return 'Store';
    default:
      return 'Admin';
  }
};
