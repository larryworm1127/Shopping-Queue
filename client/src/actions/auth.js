// Functions to help with user authentication actions.

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
          userType: json.userType,
          isLoggedIn: true,
          isReadingCookie: false
        });
      } else {
        app.setState({
          isReadingCookie: false
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
      return res.json();
    })
    .then(json => {
      if (json.message !== undefined) {
        loginComp.setState({
          displayError: true,
          errorMessage: json.message
        });
      } else {
        app.setState({
          currentUser: json.currentUser,
          userType: json.userType,
          isLoggedIn: true,
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};


// A function that verifies account detail before allowing user to enter profile info
export const registerVerify = (username, password, confirmPassword, userType, setError, handleNext) => {
  const request = new Request('/api/verifyRegister', {
    method: 'post',
    body: JSON.stringify({ username, password, confirmPassword, userType }),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  });

  fetch(request)
    .then(res => {
      return res.json();
    })
    .then(json => {
      if (json.message !== undefined) {
        setError(json.message);
      } else {
        handleNext();
      }
    })
    .catch(error => {
      console.log(error);
    });
};


// A function to send a POST request with the new user info
export const register = (registerComp, currPage) => {
  const request = new Request('/api/register', {
    method: 'post',
    body: JSON.stringify(registerComp.state),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  });

  // Send the request with fetch()
  fetch(request)
    .then(res => {
      return res.json();
    })
    .then(json => {
      if (json.message !== undefined) {
        currPage.setState({
          errorMessage: json.message
        });
      } else {
        currPage.setState({
          showLoginButton: true
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
        userType: null,
        isLoggedIn: false,
      });
    })
    .catch(error => {
      console.log(error);
    });
};

