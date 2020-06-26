import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormTextField from '../formTextField';


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
          <Grid item xs={12}>
            <Typography className={classes.accountDetailFormControlLabel}>
              Register as
            </Typography>

            <FormControl className={classes.accountDetailFormControl}>
              <Select
                value={registerFor}
                onChange={(event) => {
                  handleFormField('registerFor', event);
                }}
                displayEmpty={true}
              >
                <MenuItem value={1}>Shopper</MenuItem>
                <MenuItem value={2}>Store Owner</MenuItem>
                <MenuItem value={3}>Admin</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default AccountDetail;
