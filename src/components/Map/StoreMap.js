import React from 'react';
import NavBar from '../Nav/navbar';
import { withRouter } from 'react-router-dom';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import { stores } from '../../utils/stores';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  mapStyles: {
    position: 'absolute',
    left: '1px',
    top: '64px',
    width: '100%',
    height: '100%',
  },
  cardStyles: {
    position: 'absolute',
    right: 0,
    top: '65px',
    width: '30%',
    height: '100%'
  }
});


class StoreMap extends React.Component {

  state = {
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {},         //Shows the infoWindow to the selected place upon a marker
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: stores[props.id],
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  handleHighlight = (index) => {
    this.setState({
      selectedPlace: stores[index],

    });
  };

  renderMarkers = () => {
    return stores.map((store, index) => (
        <Marker
          key={index}
          id={index}
          position={{
            lat: store.coordinate[0],
            lng: store.coordinate[1]
          }}
          onClick={this.onMarkerClick}
        />
      )
    );
  };

  renderStoreCards = (classes) => {
    return stores.map((store, index) => (
        <Card key={index} id={index}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {store.type}
            </Typography>
            <Typography variant="h5" component="h2">
              {store.name}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {store.address}
            </Typography>
            <Typography variant="body2" component="p">
              Open from <b>{store.openingTime}</b> to <b>{store.closingTime}</b>
              <br/>
              <b>Customer limit:</b> {store.customerLimit}
              <br/>
              <b>Customer Shop Time Limit:</b> {store.customerShopTime} min
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">Queue Here</Button>
            <Button
              type="button"
              color="primary"
              onClick={() => {
                this.handleHighlight(index);
              }}
            >
              Highlight on Map
            </Button>
          </CardActions>
        </Card>
      )
    );
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
              <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.onClose}
              >
                <div>
                  <h4>Store Name: {this.state.selectedPlace.name}</h4>
                  <h4>Address: {this.state.selectedPlace.address}</h4>
                </div>
              </InfoWindow>
            </Map>
          </Grid>

          <Grid item xs={3} className={classes.cardStyles}>
            {this.renderStoreCards(classes)}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAgAnqHQF4Z6NpppDIGCA1gYD367qOPKFs'
})(withRouter(withStyles(styles)(StoreMap)));
