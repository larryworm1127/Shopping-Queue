// Functions to help with shopper actions.

export const getShopperProfile = (username, profileComp) => {
  const url = `/api/shopper/profile/${username}`;

  fetch(url)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then(json => {
      if (json) {
        console.log(json);
        profileComp.setState({
          firstName: json.firstName,
          lastName: json.lastName,
          email: json.email,
          address: json.address,
          favoriteStores: json.favouriteStores,
          remindTime: json.remindTime
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};


export const updateShopperProfile = (username, profileComp) => {  
  const request = new Request(`/api/shopper/profile/${username}`, {
    method: 'PATCH',
    body: JSON.stringify(profileComp.state),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  });
  console.log(profileComp.state);
  fetch(request)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then(json => {
      if (json) {
        profileComp.setState({
          firstName: json.firstName,
          lastName: json.lastName,
          email: json.email,
          address: json.address,
          remindTime: json.remindTime,
          edit: false
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};
