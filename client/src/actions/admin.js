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
