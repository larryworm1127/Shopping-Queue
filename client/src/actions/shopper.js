// Functions to help with shopper actions.

import { getStore } from "../utils/stores";

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
        const favoriteStores = [];
        const searchHistory = [];
        const queueHistory = [];
        
        for (let i = 0; i < json.favouriteStores.length; i++) {
          getStoreFromList(json.favouriteStores[i], favoriteStores);
        }
        
        for (let i = 0; i < json.searchHistory.length; i++) {
          getStoreFromList(json.searchHistory[i], searchHistory);
        }

        for (let i = 0; i < json.queueHistory.length; i++) {
          getStoreFromList(json.queueHistory[i], queueHistory);
        }

        profileComp.setState({
          firstName: json.firstName,
          lastName: json.lastName,
          email: json.email,
          address: json.address,
          remindTime: json.remindTime,
          favoriteStores: favoriteStores,
          searchHistory: searchHistory,
          queueHistory: queueHistory
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};

async function getStoreFromList(storeUsername, storeList) {
  const url = `/api/store/profile/${storeUsername}`;
  await fetch(url)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
    }).then(json => {
      storeList.push(json);
    })
    .catch(error => {
      console.log(error);
    })
}

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
