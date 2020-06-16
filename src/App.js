import React from 'react';

// Importing react-router-dom to use the React Router
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

// Importing the Queue and our simple Home Page
import Queue from './components/Queue';
import Home from './components/Home';
import NavBar from "./components/navbar";

class App extends React.Component {

  state = {
    abc: "123"
  }

  render() {
    return (
      <div>
        <NavBar/>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={() => (<Home state={this.state}/>)}/>
            <Route exact path='/queue' render={() => (<Queue state={this.state}/>)}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
