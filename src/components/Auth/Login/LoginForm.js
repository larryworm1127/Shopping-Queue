// React imports
import React from 'react';
// Material UI imports
import { Button, Checkbox, FormControlLabel } from '@material-ui/core';
// User JS imports
import FormTextField from '../FormTextField';
import FormSelectField from '../FormSelectField';
import { loginVerify } from '../../../utils/verifyAuth';


class LoginForm extends React.Component {

  state = {
    username: '',
    password: '',
    loginAs: 0,
    displayError: false,
    errorMessage: ''
  };

  handleFormField = (field, event) => {
    this.setState({
      [field]: event.target.value,
      displayError: false,
      errorMessage: ''
    });
  };

  displayError = (message) => {
    this.setState({
      displayError: true,
      errorMessage: message
    });
  };

  handleLoginSubmit = (event) => {
    const { loginUser } = this.props;

    event.preventDefault();
    const verify = loginVerify(this.state.username, this.state.password, this.state.loginAs);
    if (verify === true) {
      loginUser();
    } else {
      this.displayError(verify);
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <form className={classes.form} onSubmit={this.handleLoginSubmit}>
          <FormTextField
            variant="outlined"
            margin="normal"
            name="username"
            label="Username"
            displayError={this.state.displayError}
            handleFormField={this.handleFormField}
          />
          <FormTextField
            variant="outlined"
            margin="normal"
            name="password"
            label="Password"
            type="password"
            errorMessage={this.state.errorMessage}
            displayError={this.state.displayError}
            handleFormField={this.handleFormField}
          />

          <FormSelectField
            name="loginAs"
            label="Login As"
            variant="outlined"
            formControlLabelClass={classes.formControlLabel}
            formControlClass={classes.formControl}
            value={this.state.loginAs}
            handleFormField={this.handleFormField}
            menuItems={['Shopper', 'Shop Owner', 'Admin']}
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary"/>}
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

export default LoginForm;
