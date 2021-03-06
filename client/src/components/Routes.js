import React from 'react';
import { BrowserRouter, Redirect, Route, Switch, useLocation } from 'react-router-dom';
import Home from './Home';
import Queue from './Queue';
import Login from './Login';
import ShopperProfile from './Profile/ShopperProfile';
import AdminProfile from './Profile/AdminProfile';
import StoreProfile from './Profile/StoreProfile';
import StoreMap from './Map';
import StoreDetail from './Store';
import StoreQueues from './Queue/StoreQueues';
import StoreShoppers from './Store/StoreShoppers';
import AllStoreQueues from './Admin/AllStoreQueues';
import UserSupport from './Admin/UserSupport';
import Loading from './Loading';
import Register from './Register';
import { logout } from '../actions/auth';
import AllShopperQueues from './Admin/AllShopperQueues';


export default props => {

  return (
    <BrowserRouter>
      <Switch>
        <HomePageRoute exact path='/' props={props}/>
        <ShopperRoute exact path='/map' props={props} component={StoreMap}/>
        <ShopperRoute exact path='/queue' props={props} component={Queue}/>
        <ShopperRoute exact path='/profile' props={props} component={ShopperProfile}/>
        <AdminRoute exact path='/admin/profile' props={props} component={AdminProfile}/>
        <AdminRoute exact path='/admin/store/queues' props={props} component={AllStoreQueues}/>
        <AdminRoute exact path='/admin/shopper/queues' props={props} component={AllShopperQueues}/>
        <AdminRoute exact path='/admin/messages' props={props} component={UserSupport}/>
        <StoreRoute exact path='/store/profile' props={props} component={StoreProfile}/>
        <StoreRoute exact path='/store/queues' props={props} component={StoreQueues}/>
        <StoreRoute exact path='/store/shoppers' props={props} component={StoreShoppers}/>
        <ShopperRoute path='/store/:username' props={props} component={StoreDetail}/>
        <AuthRoute exact path='/login' props={props} component={Login}/>
        <AuthRoute exact path='/register' props={props} component={Register}/>
        <Route exact path='/logout' component={() => SignOut(props)}/>
        <Route path='*' component={NoMatch}/>
      </Switch>
    </BrowserRouter>
  );
}

const SignOut = (props) => {
  logout(props.app);
  return <Redirect to={{ pathname: '/login' }}/>;
};


const AuthRoute = ({ component: Component, props, ...rest }) => {
  const { isLoggedIn } = props;

  return (
    <Route
      {...rest}
      render={({ history }) => {
        return isLoggedIn ?
          <Redirect to={{ pathname: '/' }}/> :
          <Component history={history} {...props} />;
      }}
    />
  );
};


const HomePageRoute = ({ props, ...rest }) => {
  const { isReadingCookie } = props;

  return (
    <Route
      {...rest}
      render={({ history }) => {
        return (isReadingCookie)
          ? <Loading/>
          : <Home {...props} history={history}/>
      }}
    />
  )
}


const ShopperRoute = ({ component: Component, props, ...rest }) => (
  <AuthenticateRoute {...rest} props={props} component={Component} authUserType={0}/>
);


const StoreRoute = ({ component: Component, props, ...rest }) => (
  <AuthenticateRoute {...rest} props={props} component={Component} authUserType={1}/>
);


const AdminRoute = ({ component: Component, props, ...rest }) => (
  <AuthenticateRoute {...rest} props={props} component={Component} authUserType={2}/>
);


const AuthenticateRoute = ({ component: Component, props, authUserType, ...rest }) => {
  const { isLoggedIn, userType, isReadingCookie } = props;

  return (
    <Route
      {...rest}
      render={({ history }) => {
        if (!isLoggedIn && !isReadingCookie) {
          return <Redirect to={{ pathname: '/login' }}/>;
        } else if (isReadingCookie) {
          return <Loading/>;
        }
        return (userType === authUserType) ?
          <Component {...props} history={history}/> :
          <Redirect to={{ pathname: '/' }}/>;
      }}
    />
  );
};


const NoMatch = () => {
  const location = useLocation();

  return (
    <div>
      <h3>
        Error 404! No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
};
