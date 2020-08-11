// Functions to help with shopper actions.

export const getShopperProfile = (username, profileComp) => {
  const url = `/api/shopper/${username}`;

  fetch(url)
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
          favouriteStores: json.favouriteStores,
          remindTime: json.remindTime
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};


export const updateShopperProfile = (username, profileComp) => {  
  const request = new Request(`/api/profile`, {
    method: 'PATCH',
    body: JSON.stringify(profileComp.state),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  });

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
          favouriteStores: json.favouriteStores,
          remindTime: json.remindTime,
          edit: false
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};
