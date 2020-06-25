import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


class OwnerProfile extends React.Component {

  render() {
    const { handleFormField } = this.props;

    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Profile details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="storeName"
              name="storeName"
              label="Store Name"
              fullWidth
              onChange={(event) => {
                handleFormField('storeName', event);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="location"
              name="location"
              label="Location"
              fullWidth
              autoComplete="address"
              onChange={(event) => {
                handleFormField('location', event);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="customerLimit"
              name="customerLimit"
              label="Customer Limit"
              type="number"
              fullWidth
              onChange={(event) => {
                handleFormField('customerLimit', event);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="shoppingTimeLimit"
              label="Customer Shopping Time Limit (min)"
              type="number"
              fullWidth
              onChange={(event) => {
                handleFormField('shoppingTimeLimit', event);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="open-time"
              label="Opening Time"
              type="time"
              defaultValue="07:30"
              fullWidth
              onChange={(event) => {
                handleFormField('openTime', event);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="close-time"
              label="Closing Time"
              type="time"
              defaultValue="07:30"
              fullWidth
              onChange={(event) => {
                handleFormField('closeTime', event);
              }}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default OwnerProfile;
