import React from 'react';

// Importing react-router-dom to use the React Router
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

// Importing the Queue and our simple Home Page
import Queue from './components/Queue';
import Home from './components/Home';
import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import indigo from "@material-ui/core/colors/indigo";
import ThemeProvider from "@material-ui/styles/ThemeProvider";

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: blue[900]
    },
    primary: {
      main: indigo[700]
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"Lato"',
      'sans-serif'
    ].join(',')
  }
});

class App extends React.Component {

  state = {
    abc: "123"
  }

  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Switch>
              <Route exact path='/' render={() => (<Home state={this.state}/>)}/>
              <Route exact path='/queue' render={() => (<Queue state={this.state}/>)}/>
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
