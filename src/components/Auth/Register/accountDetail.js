import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';


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
          <Grid item xs={12}>
            <TextField
              required
              id="username"
              name="username"
              label="Username"
              fullWidth
              error={displayError}
              autoComplete="username"
              onChange={(event) => {
                handleFormField('username', event);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              error={displayError}
              autoComplete="email"
              onChange={(event) => {
                handleFormField('email', event);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              error={displayError}
              autoComplete="current-password"
              onChange={(event) => {
                handleFormField('password', event);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="confirm-password"
              name="confirm-password"
              label="Confirm Password"
              type="password"
              fullWidth
              error={displayError}
              helperText={errorMessage}
              autoComplete="corrent-password"
              onChange={(event) => {
                handleFormField('confirmPassword', event);
              }}
            />
          </Grid>
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
