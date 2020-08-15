import React from 'react';
import { Button, Checkbox, FormControlLabel, withStyles } from '@material-ui/core';
import FormTextField from '../../FormTextField';
import FormSelectField from '../../FormSelectField';
import { withRouter } from 'react-router-dom';
import { login } from '../../../actions/auth';
import { styles } from './style';


class LoginForm extends React.Component {

  constructor(props) {
    super(props);

    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const userType = localStorage.getItem('userType');
    const checked = localStorage.getItem('checked');
    this.state = {
      username: (username) ? username : '',
      password: (password) ? password : '',
      userType: (userType) ? userType : 0,
      displayError: false,
      errorMessage: '',
      checked: !!(checked)
    };
  }


  handleLoginSubmit = (event) => {
    event.preventDefault();

    // Save credentials in localstorage for remember me
    if (this.state.checked) {
      localStorage.setItem('checked', this.state.checked);
      localStorage.setItem('username', this.state.username);
      localStorage.setItem('password', this.state.password);
      localStorage.setItem('userType', this.state.userType);
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
      localStorage.removeItem('userType');
      localStorage.removeItem('checked');
    }

    // Login user
    login(this, this.props.app);
  };

  render() {
    const { classes } = this.props;
    const { displayError, errorMessage, userType, checked, username, password } = this.state;

    return (
      <React.Fragment>
        <form className={classes.form} onSubmit={this.handleLoginSubmit}>
          <FormTextField
            variant="outlined"
            margin="normal"
            name="username"
            label="Username"
            displayError={displayError}
            value={username}
            comp={this}
          />

          <FormTextField
            variant="outlined"
            margin="normal"
            name="password"
            label="Password"
            type="password"
            errorMessage={errorMessage}
            displayError={displayError}
            value={password}
            comp={this}
          />

          <FormSelectField
            name="userType"
            label="Login As"
            variant="outlined"
            value={userType}
            comp={this}
            menuItems={['Shopper', 'Shop Owner', 'Admin']}
            useIndex
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                color="primary"
                onChange={(_, checked) => this.setState({ checked })}
              />
            }
            label="Remember me"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(LoginForm));
