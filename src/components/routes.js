import React from 'react';
import { BrowserRouter, Redirect, Route, Switch, useLocation } from 'react-router-dom';
import Home from './Home/';
import Queue from './Queue';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Profile from './Profile/profile';
import StoreMap from './Map';
import StoreDetail from './Store';
import store from 'store';


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
        <AuthenRoute path='/map' component={StoreMap}>
        </AuthenRoute>
        <AuthenRoute path='/queue' component={Queue}>
        </AuthenRoute>
        <Route exact path='/login'>
          <Login
            loginUser={loginUser}
            logoutUser={logoutUser}
          />
        </Route>
        <Route exact path='/register' component={regsiterfunc()}>

        </Route>
        <AuthenRoute path='/profile' component={Profile}>
        </AuthenRoute>
        <Route path='/logout' component={signoutfunc()}>
        </Route>
        <Route exact path='/store/:id'>
          <StoreDetail/>
        </Route>
        <Route path='*' component={NoMatch}/>
      </Switch>
    </BrowserRouter>
  );
}

const signoutfunc = () => () => {
  store.remove('loggedIn');
  return (
    <Redirect
      to={{
        pathname: '/login',
      }}
    />
  );
};

const regsiterfunc = () => () => {
  return (
    <Route
      render={() =>
        store.get('loggedIn') ? (
          <Profile/>
        ) : (
          <Register/>
        )
      }
    />
  );
};

function AuthenRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        !!store.get('loggedIn') ? (
          <Component {...props} />
        ) : (
          <Login/>
        )
      }
    />
  );
}


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
