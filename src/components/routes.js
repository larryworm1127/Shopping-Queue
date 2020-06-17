import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Queue from "./Queue";
import Login from "./Auth/login";
import Signup from "./Auth/signup";
import Profile from "./Profile/profile";

export default props => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={ Home }/>
      <Route exact path='/queue' component={ Queue }/>
      <Route exact path='/login' component={ Login }/>
      <Route exact path='/signup' component={ Signup }/>
      <Route exact path='/profile' component={ Profile }/>
    </Switch>
  </BrowserRouter>
)
