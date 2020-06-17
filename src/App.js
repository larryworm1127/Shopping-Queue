import React from 'react';

// Importing routing component
import Routes from './components/routes';
import './App.css';

// Importing material UI items
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import indigo from '@material-ui/core/colors/indigo';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

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
    abc: '123'
  };

  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <Routes/>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
