import React from 'react';
import NavBar from '../Nav/navbar';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import Grid from '@material-ui/core/Grid';

const mapStyles = {
  // width: '70%',
  height: '90%',
};


class StoreMap extends React.Component {

  state = {
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    const {
      location
    } = this.props;

    return (
      <React.Fragment>
        <NavBar currentPath={location.pathname}/>
        <CssBaseline/>

        <Grid container>
          <Grid item xs={8}>
            <Map
              google={this.props.google}
              zoom={16}
              style={mapStyles}
              initialCenter={{ lat: 43.66, lng: -79.39 }}
            >
              <Marker
                onClick={this.onMarkerClick}
                name={'Kenyatta International Convention Centre'}
              />
              <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.onClose}
              >
                <div>
                  <h4>{this.state.selectedPlace.name}</h4>
                </div>
              </InfoWindow>
            </Map>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAgAnqHQF4Z6NpppDIGCA1gYD367qOPKFs'
})(withRouter(StoreMap));
