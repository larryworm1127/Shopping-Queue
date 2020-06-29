import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormTextField from '../FormTextField';

class ShopperProfile extends React.Component {

  render() {
    const { handleFormField } = this.props;

    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Profile details
        </Typography>
        <Grid container spacing={3}>
          <FormTextField
            name="firstName"
            label="First name"
            handleFormField={handleFormField}
          />
          <FormTextField
            name="lastName"
            label="Last name"
            handleFormField={handleFormField}
          />
          <FormTextField
            name="address"
            label="Address"
            handleFormField={handleFormField}
          />
        </Grid>
      </React.Fragment>
    );
  }
}

export default ShopperProfile;
