import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormTextField from '../../FormTextField';
import RegisterFormButtons from './RegisterFormButtons';


class ShopperProfile extends React.Component {

  render() {
    const { handleNext, activeStep, handleBack, firstName, lastName, address, remindTime, comp } = this.props;

    return (
      <React.Fragment>
        <form onSubmit={handleNext}>
          <Typography variant="h6" gutterBottom>
            Profile details
          </Typography>
          <Grid container spacing={3}>
            <FormTextField
              name="firstName"
              label="First name"
              value={firstName}
              comp={comp}
            />
            <FormTextField
              name="lastName"
              label="Last name"
              value={lastName}
              comp={comp}
            />
            <FormTextField
              name="address"
              label="Address"
              value={address}
              comp={comp}
            />
            <FormTextField
              name="remindTime"
              label="Remind Time (min)"
              value={remindTime}
              type="number"
              comp={comp}
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

export default ShopperProfile;
