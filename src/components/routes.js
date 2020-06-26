import React from 'react';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';
import Home from './home';
import Queue from './Queue';
import Login from './Auth/Login/login';
import Register from './Auth/Register/register';
import Profile from './Profile/profile';

export default props => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/queue' component={Queue}/>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/register' component={Register}/>
      <Route exact path='/profile' component={Profile}/>
      <Route path='*' component={NoMatch}/>
    </Switch>
  </BrowserRouter>
)


const NoMatch = props => {
  let location = useLocation();

  return (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
)};
