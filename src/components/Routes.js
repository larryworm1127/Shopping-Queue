import React from 'react';
import { BrowserRouter, Redirect, Route, Switch, useLocation } from 'react-router-dom';
import Home from './Home/';
import Queue from './Queue';
import Login from './Auth/Login';
import ShopperProfile from './Profile/ShopperProfile';
import AdminProfile from './Profile/AdminProfile';
import OwnerPage from './Profile/OwnerProfile';
import StoreMap from './Map';
import StoreDetail from './Store';
import store from 'store';
import Register from './Auth/Register';
import StoreQueues from './Store/StoreQueues';
import StoreShoppers from './Store/StoreShoppers';
import AllQueues from './Admin/AllQueues';


export default () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}/>
        <ShopperRoute exact path='/map' component={StoreMap}/>
        <AuthenRoute exact path='/queue' component={Queue}/>
        <ShopperRoute exact path='/profile' component={ShopperProfile}/>
        <StoreRoute exact path='/store/profile' component={OwnerPage}/>
        <AdminRoute exact path='/admin/profile' component={AdminProfile}/>
        <AdminRoute exact path='/admin/queues' component={AllQueues}/>
        <StoreRoute exact path='/store/queues' component={StoreQueues}/>
        <StoreRoute exact path='/store/shoppers' component={StoreShoppers}/>
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
  store.remove('user');
  store.remove('loginAs');
  return <Redirect to={{ pathname: '/login' }}/>;
};


const RegisterRedirect = () => {
  return store.get('loggedIn') ? <Redirect to={{ pathname: '/profile' }}/> : <Register/>;
};


const ShopperRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (store.get('loggedIn') && store.get('loginAs') === 0) ?
      <Component {...props} /> : <Redirect to={{ pathname: '/' }}/>
    }
  />
);


const StoreRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (store.get('loggedIn') && store.get('loginAs') === 1) ?
      <Component {...props} /> : <Redirect to={{ pathname: '/' }}/>
    }
  />
);


const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (store.get('loggedIn') && store.get('loginAs') === 2) ?
      <Component {...props} /> : <Redirect to={{ pathname: '/' }}/>
    }
  />
);


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
