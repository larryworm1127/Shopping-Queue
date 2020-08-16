import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormTextField from '../../FormTextField';
import FormSelectField from '../../FormSelectField';
import { StoreTypes } from '../../../utils/utils';
import RegisterFormButtons from './RegisterFormButtons';
import AddressAutocomplete from '../../AddressAutocomplete';


class OwnerProfile extends React.Component {

  render() {
    const {
      handleNext,
      comp,
      activeStep,
      handleBack,
      storeType,
      storeName,
      location,
      customerLimit,
      shoppingTimeLimit,
      openTime,
      closeTime,
    } = this.props;

    return (
      <React.Fragment>
        <form onSubmit={handleNext}>
          <Typography variant="h6" gutterBottom>
            Profile details
          </Typography>
          <Grid container spacing={3}>
            <FormTextField
              name="storeName"
              label="Store Name"
              value={storeName}
              comp={comp}
            />

            <AddressAutocomplete
              comp={comp}
              location={location}
            />

            <FormTextField
              name="customerLimit"
              label="Customer Limit"
              type="number"
              value={customerLimit}
              comp={comp}
            />
            <FormTextField
              name="shoppingTimeLimit"
              label="Customer Shopping Time Limit (min)"
              type="number"
              value={shoppingTimeLimit}
              comp={comp}
            />
            <FormTextField
              name="openTime"
              label="Opening Time"
              type="time"
              value={openTime}
              comp={comp}
            />
            <FormTextField
              name="closeTime"
              label="Closing Time"
              type="time"
              value={closeTime}
              comp={comp}
            />
            <FormSelectField
              name="storeType"
              label="Store Type"
              comp={comp}
              value={storeType}
              menuItems={Object.values(StoreTypes)}
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

export default OwnerProfile;
