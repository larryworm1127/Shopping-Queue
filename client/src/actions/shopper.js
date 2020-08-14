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
        profileComp.setState({
          firstName: json.firstName,
          lastName: json.lastName,
          email: json.email,
          address: json.address,
          remindTime: json.remindTime,
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const addFavouriteStore = (shopperUsername, storeUsername) => {
  // const url = `/api/shopper/profile/favorites/${shopperUsername}/${storeUsername}`;
  const request = new Request(`/api/shopper/profile/favorites/${shopperUsername}/${storeUsername}`, {
    method: 'PATCH',
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
    .catch(err => {
      console.log(err);
    })
}

export const removeFavouriteStore = (shopperUsername, storeUsername) => {
  // const url = `/api/shopper/profile/favorites/${shopperUsername}/${storeUsername}`;
  const request = new Request(`/api/shopper/profile/favorites/${shopperUsername}/${storeUsername}`, {
    method: 'DELETE',
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
    .catch(err => {
      console.log(err);
    })
}

export const getShopperFavoriteStores = (username, profileComp) => {
  const url = `/api/shopper/favorites/${username}`;

  fetch(url)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then(json => {
      if (json) {
        profileComp.setState({
          favoriteStores: [...json]
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};


export const getShopperSearchHistory = (username, profileComp) => {
  const url = `/api/shopper/searchHistory/${username}`;

  fetch(url)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then(json => {
      if (json) {
        profileComp.setState({
          searchHistory: [...json]
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};


export const getShopperQueueHistory = (username, profileComp) => {
  const url = `/api/shopper/queueHistory/${username}`;

  fetch(url)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then(json => {
      if (json) {
        profileComp.setState({
          queueHistory: [...json]
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
