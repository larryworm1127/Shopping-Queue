// Temporary credentials (reset every time server restarts)
const shopperCredentials = [
  { username: 'user', password: 'user' },
  { username: 'user2', password: 'user2' }
];

const shopOwnerCredentials = [
  { username: 'store1', password: 'store1' },
  { username: 'store2', password: 'store2' }
];

const adminCredentials = [
  { username: 'admin', password: 'admin' }
];


// Login
const loginVerifyHelper = (username, password, credList) => {
  for (let index = 0; index < credList.length; index++) {
    if (credList[index].username === username) {
      return credList[index].password === password;
    }
  }
  return 'Incorrect username or password!';
};

export const loginVerify = (username, password, accountType) => {
  // Implement database access and query for user credential verification here.
  switch (accountType) {
    case 1:
      return loginVerifyHelper(username, password, shopperCredentials);
    case 2:
      return loginVerifyHelper(username, password, shopOwnerCredentials);
    case 3:
      return loginVerifyHelper(username, password, adminCredentials);
    default:
      return Error('Unknown account type');
  }
};


// Register
const registerVerifyHelper = (username, password, confirmPass, credList) => {
  if (password.length < 4) {
    return 'Password too short! (minimum 4 characters)';
  }

  if (password !== confirmPass) {
    return 'Password don\'t match';
  }

  for (let index = 0; index < credList.length; index++) {
    if (credList[index].username === username) {
      return 'Username taken!';
    }
  }
  credList.push({ username: username, password: password });
  return true;
};

export const registerVerify = (username, password, confirmPass, accountType) => {
  // Implement database access and query for user credential verification here.
  switch (accountType) {
    case 1:
      return registerVerifyHelper(username, password, confirmPass, shopperCredentials);
    case 2:
      return registerVerifyHelper(username, password, confirmPass, shopOwnerCredentials);
    case 3:
      return registerVerifyHelper(username, password, confirmPass, adminCredentials);
    default:
      return Error('Unknown account type');
  }
};
