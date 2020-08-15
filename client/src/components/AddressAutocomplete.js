import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Container, Paper } from '@material-ui/core';
import { uid } from 'react-uid';
import Typography from '@material-ui/core/Typography';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';


class AddressAutocomplete extends React.Component {

  handleSelect(address) {
    geocodeByAddress(address)
      .then(results => {
        getLatLng(results[0]).then(coordinates => {
          this.setState({
            location: address,
            coordinates: { ...coordinates }
          });
        });
      })
      .catch(error => console.log(error));
  };

  render() {
    const { comp, location, variant, margin } = this.props;

    return (
      <PlacesAutocomplete
        value={location}
        onChange={value => comp.setState({ location: value })}
        onSelect={this.handleSelect.bind(comp)}
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
                  variant={variant}
                  margin={margin}
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
    )
  }
}

export default AddressAutocomplete;
