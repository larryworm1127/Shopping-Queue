import React from 'react';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';
import Home from './home';
import Queue from './Queue';
import Login from './Auth/Login/login';
import Register from './Auth/Register/register';
import Profile from './Profile/profile';
import StoreMap from './Map/StoreMap';

export default props => {
  const {
    loggedIn,
    loginUser,
    logoutUser
  } = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Home/>
        </Route>
        <Route exact path='/map'>
          <StoreMap/>
        </Route>
        <Route exact path='/queue'>
          <Queue/>
        </Route>
        <Route exact path='/login'>
          <Login
            loggedIn={loggedIn}
            loginUser={loginUser}
            logoutUser={logoutUser}
          />
        </Route>
        <Route exact path='/register'>
          <Register/>
        </Route>
        <Route exact path='/profile'>
          <Profile/>
        </Route>
        <Route path='*' component={NoMatch}/>
      </Switch>
    </BrowserRouter>
  );
}


const NoMatch = () => {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
};
