// Functions to help with admin actions.

export const getAdminProfile = (username, profileComp) => {
  const url = `/api/admin/${username}`;

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
  const request = new Request(`/api/admin/${username}`, {
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
