import React from 'react';
import { BrowserRouter, Redirect, Route, Switch, useLocation } from 'react-router-dom';
import Home from './Home/';
import Queue from './Queue';
import Login from './Auth/Login';
import Profile from './Profile';
import AdminProfile from './AdminProfile';
import StoreMap from './Map';
import StoreDetail from './Store';
import store from 'store';
import Register from './Auth/Register';


export default () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}/>
        <AuthenRoute exact path='/map' component={StoreMap}/>
        <AuthenRoute exact path='/queue' component={Queue}/>
        <AuthenRoute exact path='/profile' component={Profile}/>
        <AuthenRoute exact path='/admin-profile' component={AdminProfile}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={RegisterRedirect}/>
        <Route exact path='/logout' component={SignOutRedirect}/>
        <Route exact path='/store/:id' component={StoreDetail}/>
        <Route path='*' component={NoMatch}/>
      </Switch>
    </BrowserRouter>
  );
}

const SignOutRedirect = () => {
  store.remove('loggedIn');
  return <Redirect to={{ pathname: '/login' }}/>;
};


const RegisterRedirect = () => {
  return store.get('loggedIn') ? <Redirect to={{ pathname: '/profile' }}/> : <Register/>;
};


const AuthenRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => !!store.get('loggedIn') ?
        <Component {...props} /> : <Redirect to={{ pathname: '/login' }}/>
      }
    />
  );
};


const NoMatch = () => {
  let location = useLocation();

  return (
    <div>
      <h3>
        Error 404! No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
};
