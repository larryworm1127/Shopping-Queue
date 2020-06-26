import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormTextField from '../formTextField';
import FormSelectField from '../formSelectField';


class AccountDetail extends React.Component {

  render() {
    const {
      classes,
      registerFor,
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
          />
          <FormTextField
            name="email"
            label="Email Address"
            type="email"
            displayError={displayError}
            handleFormField={handleFormField}
          />
          <FormTextField
            name="password"
            label="Password"
            type="password"
            displayError={displayError}
            handleFormField={handleFormField}
          />
          <FormTextField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            displayError={displayError}
            handleFormField={handleFormField}
            errorMessage={errorMessage}
          />

          <FormSelectField
            name="registerFor"
            label="Register For"
            formControlLabelClass={classes.accountDetailFormControlLabel}
            formControlClass={classes.accountDetailFormControl}
            value={registerFor}
            handleFormField={handleFormField}
          />
        </Grid>
      </React.Fragment>
    );
  }
}

export default AccountDetail;
