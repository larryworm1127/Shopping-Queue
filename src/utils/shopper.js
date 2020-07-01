class Shopper {
  constructor(username, email, remindTime) {
    this.username = username;
    this.email = email;
    this.favoriteStores = [];
    this.searchHistory = [];
    this.queueHistory = [];
    this.remindTime = remindTime;
  }
}


shoppers = [
  new Shopper(
    'user',
    'user@test.com',
    30
  ),
  new Shopper(
    'user2',
    'user2@test.com',
    45
  )
]
