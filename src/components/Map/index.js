import React from 'react';
import NavBar from '../Nav/navbar';
import { withRouter } from 'react-router-dom';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import { stores } from '../../utils/stores';
import { withStyles } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { styles } from './style';
import StoreCards from './StoreCards';


class StoreMap extends React.Component {

  state = {
    currStore: null,
    showMarker: false
  };

  handleHighlight = (index) => {
    this.setState({
      currStore: stores[index],
      showMarker: true
    });
  };

  renderMarkers = () => {
    if (this.state.currStore !== null) {
      return (
        <Marker
          position={{
            lat: this.state.currStore.coordinate[0],
            lng: this.state.currStore.coordinate[1]
          }}
          visible={this.state.showMarker}
        />
      );
    }
  };

  render() {
    const {
      classes,
      location
    } = this.props;

    return (
      <React.Fragment>
        <NavBar currentPath={location.pathname}/>
        <CssBaseline/>

        <Grid container>
          <Grid item xs={9} className={classes.mapStyles}>
            <Map
              google={this.props.google}
              zoom={16}
              initialCenter={{ lat: 43.662410, lng: -79.395424 }}
            >
              {this.renderMarkers()}
            </Map>
          </Grid>

          <Grid item xs={3} className={classes.cardStyles}>
            <StoreCards classes={classes}/>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAgAnqHQF4Z6NpppDIGCA1gYD367qOPKFs'
})(withRouter(withStyles(styles)(StoreMap)));
