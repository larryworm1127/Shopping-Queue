import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormTextField from '../../FormTextField';
import FormSelectField from '../../FormSelectField';
import { StoreTypes } from '../../../utils/stores';
import RegisterFormButtons from './RegisterFormButtons';


class OwnerProfile extends React.Component {

  render() {
    const {
      handleNext,
      handleFormField,
      activeStep,
      handleBack,
      storeType,
      storeName,
      location,
      customerLimit,
      shoppingTimeLimit,
      openTime,
      closeTime
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
              handleFormField={handleFormField}
            />
            <FormTextField
              name="location"
              label="Location"
              value={location}
              handleFormField={handleFormField}
            />
            <FormTextField
              name="customerLimit"
              label="Customer Limit"
              type="number"
              value={customerLimit}
              handleFormField={handleFormField}
            />
            <FormTextField
              name="shoppingTimeLimit"
              label="Customer Shopping Time Limit (min)"
              type="number"
              value={shoppingTimeLimit}
              handleFormField={handleFormField}
            />
            <FormTextField
              name="openTime"
              label="Opening Time"
              type="time"
              value={openTime}
              handleFormField={handleFormField}
            />
            <FormTextField
              name="closeTime"
              label="Closing Time"
              type="time"
              value={closeTime}
              handleFormField={handleFormField}
            />
            <FormSelectField
              name="storeType"
              label="Store Type"
              handleFormField={handleFormField}
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
