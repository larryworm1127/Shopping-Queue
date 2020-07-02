import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormTextField from '../../FormTextField';
import FormSelectField from '../../FormSelectField';
import { StoreTypes } from '../../../utils/stores';
import RegisterFormButtons from './RegisterFormButtons';
import { styles } from './style';
import { withStyles } from '@material-ui/core';


class OwnerProfile extends React.Component {

  handleOwnerProfile = (event) => {
    event.preventDefault();

    const { handleNext } = this.props;
    handleNext();
  };

  render() {
    const {
      classes,
      handleFormField,
      activeStep,
      handleBack,
      storeType
    } = this.props;

    return (
      <React.Fragment>
        <form onSubmit={this.handleOwnerProfile}>
          <Typography variant="h6" gutterBottom>
            Profile details
          </Typography>
          <Grid container spacing={3}>
            <FormTextField
              name="storeName"
              label="Store Name"
              handleFormField={handleFormField}
            />
            <FormTextField
              name="location"
              label="Location"
              handleFormField={handleFormField}
            />
            <FormTextField
              name="customerLimit"
              label="Customer Limit"
              type="number"
              handleFormField={handleFormField}
            />
            <FormTextField
              name="shoppingTimeLimit"
              label="Customer Shopping Time Limit (min)"
              type="number"
              handleFormField={handleFormField}
            />
            <FormTextField
              name="openTime"
              label="Opening Time"
              type="time"
              defaultValue="07:30"
              handleFormField={handleFormField}
            />
            <FormTextField
              name="closeTime"
              label="Closing Time"
              type="time"
              defaultValue="07:30"
              handleFormField={handleFormField}
            />
            <FormSelectField
              name="storeType"
              label="Store Type"
              formControlLabelClass={classes.formControlLabel}
              formControlClass={classes.formControl}
              handleFormField={handleFormField}
              value={storeType}
              menuItems={Object.keys(StoreTypes)}
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

export default withStyles(styles)(OwnerProfile);
