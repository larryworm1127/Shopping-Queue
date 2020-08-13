export const getStoreProfile = (username, profileComp) => {
  const url = `/api/store/profile/${username}`;

  fetch(url)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then(json => {
      if (json) {
        profileComp.setState({
          storeName: json.storeName,
          email: json.email,
          storeType: json.type,
          address: json.address,
          openTime: json.openingTime,
          closeTime: json.closingTime,
          customerLimit: json.customerLimit,
          customerShopTime: json.customerShopTime,
          coordinate: [...json.coordinate]
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};


export const getStoreObj = (username, comp) => {
  const url = `/api/store/profile/${username}`;

  fetch(url)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then(json => {
      if (json) {
        comp.setState({
          store: json
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};


export const updateStoreProfile = (username, profileComp) => {
  const request = new Request(`/api/store/profile/${username}`, {
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
          storeName: json.storeName,
          email: json.email,
          storeType: json.type,
          address: json.address,
          openTime: json.openingTime,
          closeTime: json.closingTime,
          customerLimit: json.customerLimit,
          customerShopTime: json.customerShopTime,
          edit: false
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const getSearchedStores = (text, stores) => {
  const url = `/api/stores`;

  fetch(url)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then(json => {
      if (json) {
        const jsonFiltered = json.filter(store => (store.storeName.toUpperCase()).includes(text.toUpperCase()))
        stores.setState({
          stores: jsonFiltered
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};
