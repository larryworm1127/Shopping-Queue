import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

class OwnerProfile extends React.Component {

  render() {
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
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="customerLimit"
              name="customerLimit"
              label="Customer Limit"
              fullWidth
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default OwnerProfile;
