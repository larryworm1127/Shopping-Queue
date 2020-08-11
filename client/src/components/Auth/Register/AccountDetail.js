import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import FormTextField from '../../FormTextField';
import FormSelectField from '../../FormSelectField';
import RegisterFormButtons from './RegisterFormButtons';
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
        <form onSubmit={this.handleAccountDetail}>
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
            handleBack={handleBack}
          />
        </form>
      </React.Fragment>
    );
  }
}

export default AccountDetail;
