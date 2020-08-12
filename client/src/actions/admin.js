// Functions to help with admin actions.

export const getAdminProfile = (username, profileComp) => {
  const url = `/api/admin/profile/${username}`;

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
          address: json.address
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};


export const updateAdminProfile = (username, profileComp) => {
  const request = new Request(`/api/admin/profile/${username}`, {
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
          edit: false
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};


export const getAllShoppers = (profileComp) => {
  const url = '/api/shoppers';

  fetch(url)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then(json => {
      if (json) {
        profileComp.setState({ shoppers: json });
      }
    })
    .catch(error => {
      console.log(error);
    });
};


export const getAllStores = (profileComp) => {
  const url = '/api/stores';

  fetch(url)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then(json => {
      if (json) {
        profileComp.setState({ stores: json });
      }
    })
    .catch(error => {
      console.log(error);
    });
};


export const getHelpMessages = (messageComp) => {
  const url = '/api/admin/messages';

  fetch(url)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then(json => {
      if (json) {
        const formattedJson = json.map((message) => {
          const result = { ...message };
          result.date = new Date(result.date).toLocaleString();
          return result;
        });
        messageComp.setState({
          messages: [...formattedJson]
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};
