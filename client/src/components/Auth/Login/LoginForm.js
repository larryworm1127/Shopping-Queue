import React from 'react';
import { Button, Checkbox, FormControlLabel, withStyles } from '@material-ui/core';
import FormTextField from '../../FormTextField';
import FormSelectField from '../../FormSelectField';
import { withRouter } from 'react-router-dom';
import { login } from '../../../actions/auth';
import { styles } from './style';


class LoginForm extends React.Component {

  state = {
    username: '',
    password: '',
    userType: 0,
    displayError: false,
    errorMessage: '',
    checked: false
  };

  handleLoginSubmit = (event) => {
    event.preventDefault();

    login(this, this.props.app);
  };

  render() {
    const { classes } = this.props;
    const { displayError, errorMessage, userType, checked } = this.state;

    return (
      <React.Fragment>
        <form className={classes.form} onSubmit={this.handleLoginSubmit}>
          <FormTextField
            variant="outlined"
            margin="normal"
            name="username"
            label="Username"
            displayError={displayError}
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
                value={checked}
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
