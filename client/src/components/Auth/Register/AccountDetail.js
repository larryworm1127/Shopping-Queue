// React imports
import React from 'react';
// Material UI imports
import { Grid, Typography, withStyles } from '@material-ui/core';
// User JS imports
import FormTextField from '../../FormTextField';
import FormSelectField from '../../FormSelectField';
import RegisterFormButtons from './RegisterFormButtons';
import { styles } from './style';
import { registerVerify } from '../../../actions/auth';


class AccountDetail extends React.Component {

  handleAccountDetail = (event) => {
    event.preventDefault();

    const { handleNext, username, password, confirmPassword, registerAs, setError } = this.props;
    registerVerify(
      username,
      password,
      confirmPassword,
      registerAs,
      setError,
      handleNext
    );
  };

  render() {
    const {
      classes,
      activeStep,
      handleBack,
      handleFormField,
      username,
      email,
      password,
      confirmPassword,
      registerAs,
      displayError,
      errorMessage
    } = this.props;

    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Register account
        </Typography>
        <Grid container spacing={3}>
          <FormTextField
            name="username"
            label="Username"
            displayError={displayError}
            handleFormField={handleFormField}
            value={username}
          />
          <FormTextField
            name="email"
            label="Email Address"
            type="email"
            displayError={displayError}
            handleFormField={handleFormField}
            value={email}
          />
          <FormTextField
            name="password"
            label="Password"
            type="password"
            displayError={displayError}
            handleFormField={handleFormField}
            value={password}
          />
          <FormTextField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            displayError={displayError}
            handleFormField={handleFormField}
            errorMessage={errorMessage}
            value={confirmPassword}
          />
          <FormSelectField
            name="registerAs"
            label="Register For"
            handleFormField={handleFormField}
            value={registerAs}
            menuItems={['Shopper', 'Shop Owner']}
          />
        </Grid>

        <RegisterFormButtons
          activeStep={activeStep}
          classes={classes}
          handleBack={handleBack}
          onClick={this.handleAccountDetail}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AccountDetail);
