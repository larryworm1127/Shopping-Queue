import React from 'react';
import { BrowserRouter, Redirect, Route, Switch, useLocation } from 'react-router-dom';
import Home from './Home';
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
import UserSupport from './Admin/UserSupport';


export default props => {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' render={() => <Home {...props}/>}/>
        <ShopperRoute exact path='/map' props={props} component={StoreMap}/>
        <AuthenRoute exact path='/queue' props={props} component={Queue}/>
        <ShopperRoute exact path='/profile' props={props} component={ShopperProfile}/>
        <StoreRoute exact path='/store/profile' props={props} component={OwnerPage}/>
        <AdminRoute exact path='/admin/profile' props={props} component={AdminProfile}/>
        <AdminRoute exact path='/admin/queues' props={props} component={AllQueues}/>
        <AdminRoute exact path='/admin/messages' props={props} component={UserSupport}/>
        <StoreRoute exact path='/store/queues' props={props} component={StoreQueues}/>
        <StoreRoute exact path='/store/shoppers' props={props} component={StoreShoppers}/>
        <Route exact path='/login' render={() => <Login {...props}/>}/>
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


const ShopperRoute = ({ component: Component, props, ...rest }) => {
  console.log('shopper route');
  console.log(props);
  return (<Route
    {...rest}
    render={() => (store.get('loggedIn') && store.get('loginAs') === 0) ?
      <Component {...props} /> : <Redirect to={{ pathname: '/' }}/>
    }
  />);
};


const StoreRoute = ({ component: Component, props, ...rest }) => (
  <Route
    {...rest}
    render={() => (store.get('loggedIn') && store.get('loginAs') === 1) ?
      <Component {...props} /> : <Redirect to={{ pathname: '/' }}/>
    }
  />
);


const AdminRoute = ({ component: Component, props, ...rest }) => (
  <Route
    {...rest}
    render={() => (store.get('loggedIn') && store.get('loginAs') === 2) ?
      <Component {...props} /> : <Redirect to={{ pathname: '/' }}/>
    }
  />
);


const AuthenRoute = ({ component: Component, props, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => !!store.get('loggedIn') ?
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
