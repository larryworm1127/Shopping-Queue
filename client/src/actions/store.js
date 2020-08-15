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


export const getAllQueuesforStore = (storeName, storeComp) => {
  const url = `/api/store/queues/${storeName}`;

  fetch(url)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then(json => {
      if (json) {
        var TotalShoppers = 0;
        for (let eachQueue of json) {
          TotalShoppers = TotalShoppers + eachQueue.numCustomers;
        }
      }
      storeComp.setState({
        TotalShoppers: TotalShoppers,
      });
    }
    )
    .catch(error => {
      console.log(error);
    });
};

export const getTodayQueuesforStore = (storeName, storeComp) => {
  const url = `/api/store/todayqueues/${storeName}`;

  fetch(url)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then(json => {
      if (json) {
        var TotalShoppersToday = 0;
        var NumberofShoppersinStore = 0;
        var NumberofShoppersinQueue = 0;
        var AverageWaitTime = 0;
        var today = new Date();
        var Anhourafter = new Date();


        Anhourafter.setTime(today.getHours() + 1);

        var tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        var shoppersInQueue = 1;

        for (let eachQueue of json) {
          TotalShoppersToday = TotalShoppersToday + eachQueue.numCustomers;
          if (eachQueue.datetime >= today.toISOString() && eachQueue.datetime <= Anhourafter.toISOString()) {
            NumberofShoppersinStore = + eachQueue.numCustomers;
          }

          if (eachQueue.datetime >= Anhourafter.toISOString() && eachQueue.datetime <= tomorrow.toISOString()) {
            NumberofShoppersinQueue = + eachQueue.numCustomers;
            AverageWaitTime = + eachQueue.shopTime;
            shoppersInQueue++;
          }
          AverageWaitTime = AverageWaitTime / shoppersInQueue;
        }
        storeComp.setState({
          TotalShoppersToday: TotalShoppersToday,
          NumberofShoppersinStore: NumberofShoppersinStore,
          NumberofShoppersinQueue: NumberofShoppersinQueue,
          AverageWaitTime: AverageWaitTime,
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};
