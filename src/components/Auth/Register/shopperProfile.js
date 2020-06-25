import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

class ShopperProfile extends React.Component {

  render() {
    const { handleFormField } = this.props;

    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Profile details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              onChange={(event) => {
                handleFormField('firstName', event);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              onChange={(event) => {
                handleFormField('lastName', event);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address"
              name="address"
              label="Address"
              fullWidth
              autoComplete="address"
              onChange={(event) => {
                handleFormField('address', event);
              }}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default ShopperProfile;
