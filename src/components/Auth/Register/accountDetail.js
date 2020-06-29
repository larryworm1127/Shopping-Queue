import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormTextField from '../formTextField';
import FormSelectField from '../formSelectField';


class AccountDetail extends React.Component {

  render() {
    const {
      classes,
      username,
      email,
      password,
      confirmPassword,
      registerAs,
      handleFormField,
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
            formControlLabelClass={classes.accountDetailFormControlLabel}
            formControlClass={classes.accountDetailFormControl}
            handleFormField={handleFormField}
            value={registerAs}
            menuItems={['Shopper', 'Shop Owner', 'Admin']}
          />
        </Grid>
      </React.Fragment>
    );
  }
}

export default AccountDetail;
