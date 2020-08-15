import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormTextField from '../../FormTextField';
import FormSelectField from '../../FormSelectField';
import { StoreTypes } from '../../../utils/stores';
import RegisterFormButtons from './RegisterFormButtons';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { uid } from 'react-uid';
import TextField from '@material-ui/core/TextField';
import { Container, Paper } from '@material-ui/core';


class OwnerProfile extends React.Component {

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then(results => {
        getLatLng(results[0]).then(coordinates => {
          this.props.comp.setState({
            location: address,
            coordinates: { ...coordinates }
          });
        });
      })
      .catch(error => console.log(error));
  };

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

            <PlacesAutocomplete
              value={location}
              onChange={value => comp.setState({ location: value })}
              onSelect={this.handleSelect}
              searchOptions={{
                types: ['address'],
                componentRestrictions: { country: 'ca' }
              }}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
                return (
                  <React.Fragment>
                    <Grid item xs={12}>
                      <TextField
                        {...getInputProps({
                          placeholder: 'Address ...',
                          className: 'location-search-input',
                        })}
                        fullWidth
                        required
                        value={location}
                      />

                      <Container component={Paper}>
                        {loading && <div>Loading...</div>}
                        {suggestions.map(suggestion => {
                          const style = suggestion.active
                            ? { backgroundColor: '#fafafa', cursor: 'pointer', marginBottom: '3px' }
                            : { backgroundColor: '#ffffff', cursor: 'pointer', marginBottom: '3px' };
                          return (
                            <div
                              {...getSuggestionItemProps(suggestion, { style })}
                              key={uid(suggestion)}
                            >
                              <Typography variant='body1' component='span'>{suggestion.description}</Typography>
                            </div>
                          );
                        })}
                      </Container>
                    </Grid>
                  </React.Fragment>
                );
              }}
            </PlacesAutocomplete>
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
