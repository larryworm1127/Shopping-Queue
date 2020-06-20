const shopperCredentials = [
  { username: 'user', password: 'user' }
];

const shopOwnerCredentials = [
  { username: 'user2', password: 'user2' }
];

const adminCredentials = [
  { username: 'admin', password: 'admin' }
];

const verifyLoginCred = (username, password, credList) => {
  for (let index = 0; index < credList.length; index++) {
    if (credList[index].username === username) {
      return credList[index].password === password;
    }
  }
  return false;
};

export const loginVerify = (username, password, accountType) => {
  switch (accountType) {
    case 1:
      return verifyLoginCred(username, password, shopperCredentials);
    case 2:
      return verifyLoginCred(username, password, shopOwnerCredentials);
    case 3:
      return verifyLoginCred(username, password, adminCredentials);
    default:
      return Error("Unknown account type")
  }
};


export const registerVerify = (username, accountType) => {
  switch (accountType) {
    case 1:
      return;
    case 2:
      return;
    case 3:
      return;
    default:
      return Error("Unknown account type")
  }
}
