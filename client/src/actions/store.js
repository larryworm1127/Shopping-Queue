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
          location: json.address,
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
          location: json.address,
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
        const jsonFiltered = json.filter(store => (store.storeName.toUpperCase()).includes(text.toUpperCase()));
        stores.setState({
          stores: jsonFiltered
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};


export const getStoreAllQueues = (storeName, storeComp) => {
  const url = `/api/store/queues/${storeName}`;

  fetch(url)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then(json => {
      if (json) {
        const totalShoppers = json.reduce((a, { numCustomers }) => {
          return a + numCustomers;
        }, 0);
        storeComp.setState({
          totalShoppers: totalShoppers,
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};


export const getStoreTodayQueues = (storeName, storeComp) => {
  const url = `/api/store/todayqueues/${storeName}`;

  fetch(url)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then(json => {
      if (json) {
        let totalShoppersToday = 0;
        let numShoppersInStore = 0;
        let numShoppersInQueue = 0;
        let avgWaitTime = 0;

        // Create various date objects for filtering
        const today = new Date();
        const anHourAfter = new Date();
        anHourAfter.setTime(today.getHours() + 1);
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        let shoppersInQueue = 1;
        for (let eachQueue of json) {
          totalShoppersToday = totalShoppersToday + eachQueue.numCustomers;
          if (eachQueue.datetime >= today.toISOString() && eachQueue.datetime <= anHourAfter.toISOString()) {
            numShoppersInStore = +eachQueue.numCustomers;
          }

          if (eachQueue.datetime >= anHourAfter.toISOString() && eachQueue.datetime <= tomorrow.toISOString()) {
            numShoppersInQueue = +eachQueue.numCustomers;
            avgWaitTime += eachQueue.shopTime;
            shoppersInQueue++;
          }
          avgWaitTime = avgWaitTime / shoppersInQueue;
        }
        storeComp.setState({
          totalShoppersToday: totalShoppersToday,
          numShoppersInStore: numShoppersInStore,
          numShoppersInQueue: numShoppersInQueue,
          avgWaitTime: avgWaitTime,
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};
