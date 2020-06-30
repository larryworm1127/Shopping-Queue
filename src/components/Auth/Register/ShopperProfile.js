import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormTextField from '../../FormTextField';
import RegisterFormButtons from './RegisterFormButtons';

class ShopperProfile extends React.Component {

  handleShopperProfile = (event) => {
    event.preventDefault();

    const { handleNext } = this.props;
    handleNext();
  };

  render() {
    const {
      classes,
      activeStep,
      handleBack,
      handleFormField
    } = this.props;

    return (
      <React.Fragment>
        <form onSubmit={this.handleShopperProfile}>
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

          <RegisterFormButtons
            activeStep={activeStep}
            classes={classes}
            handleBack={handleBack}
          />
        </form>
      </React.Fragment>
    );
  }
}

export default ShopperProfile;
