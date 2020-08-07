// React imports
import React from 'react';
// Material UI imports
import { Button, Checkbox, FormControlLabel, withStyles } from '@material-ui/core';
// User JS imports
import FormTextField from '../../FormTextField';
import FormSelectField from '../../FormSelectField';
import { withRouter } from 'react-router-dom';
import { login } from '../../../actions/auth';
import { styles } from './style';


class LoginForm extends React.Component {

  state = {
    username: null,
    password: null,
    userType: 0,
    displayError: false,
    errorMessage: null
  };

  handleFormField = (field, event) => {
    this.setState({
      [field]: event.target.value,
      displayError: false,
      errorMessage: null
    });
  };

  render() {
    const { classes, app } = this.props;
    const { displayError, errorMessage, userType } = this.state;

    return (
      <React.Fragment>
        <div className={classes.form}>
          <FormTextField
            variant="outlined"
            margin="normal"
            name="username"
            label="Username"
            displayError={displayError}
            handleFormField={this.handleFormField}
          />

          <FormTextField
            variant="outlined"
            margin="normal"
            name="password"
            label="Password"
            type="password"
            errorMessage={errorMessage}
            displayError={displayError}
            handleFormField={this.handleFormField}
          />

          <FormSelectField
            name="userType"
            label="Login As"
            variant="outlined"
            value={userType}
            handleFormField={this.handleFormField}
            menuItems={['Shopper', 'Shop Owner', 'Admin']}
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary"/>}
            label="Remember me"
          />

          <Button
            onClick={() => {
              login(this, app);
            }}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(LoginForm));