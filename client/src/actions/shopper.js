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
  const request = new Request(`/api/shopper/favorites/${shopperUsername}/${storeUsername}`, {
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
    });
};


export const removeFavouriteStore = (shopperUsername, storeUsername) => {
  const request = new Request(`/api/shopper/favorites/${shopperUsername}/${storeUsername}`, {
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
    });
};


export const getShopperFavoriteStores = (username, profileComp) => {
  console.log("USERNAMEEEEEE:", username)
  const url = `/api/shopper/favorites/${username}`;

  fetch(url)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then(json => {
      if (json) {
      console.log("JSONNNNNN", json)
        profileComp.setState({
          favoriteStores: [...json]
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};


export const getShopperFavoriteStoresMarkMap = (username, profileComp) => {
  const url = `/api/shopper/favorites/${username}`;

  fetch(url)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then(json => {
      if (json) {
        const markedFavourites = [];
        for (let i = 0; i < profileComp.state.stores.length; i++) {
          let marked = false;
          for (let j = 0; j < json.length; j++) {
            if (profileComp.state.stores[i].username === json[j].username) {
              marked = true;
              markedFavourites.push(true);
            }
          }

          if (!marked) {
            markedFavourites.push(false);
          }
        }

        profileComp.setState({
          favoriteStores: [...json],
          markedFavourites: markedFavourites
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};


export const addToViewHistory = (username, store) => {
  const request = new Request(`/api/shopper/viewHistory/${username}`, {
    method: 'POST',
    body: JSON.stringify({ store }),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  })

  fetch(request).catch(error => console.log(error))
}


export const getShopperViewHistory = (username, profileComp) => {
  const url = `/api/shopper/viewHistory/${username}`;

  fetch(url)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then(json => {
      if (json) {
        profileComp.setState({
          viewHistory: [...json]
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};


export const deleteShopperViewHistory = (username, id, comp, index) => {
  const request = new Request(`/api/shopper/viewHistory/${username}`, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  });

  fetch(request)
    .then(res => {
      if (res.status === 200) {
        const viewHistory = [...comp.state.viewHistory];
        viewHistory.splice(index, 1);
        comp.setState({
          viewHistory: [...viewHistory]
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


export const deleteShopperQueueHistory = (username, id, comp, index) => {
  const request = new Request(`/api/shopper/queueHistory/${username}`, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  });

  fetch(request)
    .then(res => {
      if (res.status === 200) {
        const queueHistory = [...comp.state.queueHistory];
        queueHistory.splice(index, 1);
        comp.setState({
          queueHistory: [...queueHistory]
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


export const getSearchedShoppers = (text, shoppers) => {
  const url = `/api/shoppers`;

  fetch(url)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then(json => {
      if (json) {
        const jsonFiltered = json.filter(({ firstName, lastName }) => {
          return `${firstName.toUpperCase()} ${lastName.toUpperCase()}`.includes(text.toUpperCase());
        });
        shoppers.setState({
          shoppers: jsonFiltered
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};
