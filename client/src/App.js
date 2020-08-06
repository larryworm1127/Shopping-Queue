import React from 'react';
// Importing routing component
import Routes from './components/Routes';
import './App.css';
// Importing material UI items
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import indigo from '@material-ui/core/colors/indigo';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { readCookie } from './actions/auth';

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

  constructor(props) {
    super(props);
    readCookie(this);
  }

  state = {
    currentUser: null,
    loginAs: null
  };

  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <Routes {...this.state} app={this}/>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
