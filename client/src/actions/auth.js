// Functions to help with user actions.

// A function to check if a user is logged in on the session cookie

export const readCookie = (app) => {
  const url = '/api/check-session';

  fetch(url)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then(json => {
      if (json && json.currentUser) {
        app.setState({
          currentUser: json.currentUser,
          userType: json.userType
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};


// A function to send a POST request with the user to be logged in
export const login = (loginComp, app) => {
  const request = new Request('/api/login', {
    method: 'post',
    body: JSON.stringify(loginComp.state),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  });

  // Send the request with fetch()
  fetch(request)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then(json => {
      if (json.currentUser !== undefined) {
        app.setState({
          currentUser: json.currentUser,
          userType: json.userType
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};


// A function to send a GET request to logout the current user
export const logout = (app) => {
  const url = '/api/logout';

  fetch(url)
    .then(() => {
      app.setState({
        currentUser: null,
        message: { type: '', body: '' }
      });
    })
    .catch(error => {
      console.log(error);
    });
};

