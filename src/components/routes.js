import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Queue from "./Queue";

export default props => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={ Home }/>
      <Route exact path='/queue' component={ Queue }/>
    </Switch>
  </BrowserRouter>
)
