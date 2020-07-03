import React from 'react';
import NavBar from '../Nav/navbar';
import { withRouter } from 'react-router-dom';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import { stores } from '../../utils/stores';
import { withStyles } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { styles } from './style';
import StoreCards from '../StoreCards';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';


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
            <Card>
              <CardActions>
                <TextField
                  variant="outlined"
                  label="Search..."
                />
                <Button
                  size="small"
                  color="primary"
                >
                  Search
                </Button>
              </CardActions>
            </Card>

            {stores.map((store, index) => (
              <StoreCards
                secondButton={(
                  <Button
                    type="button"
                    color="primary"
                    onClick={() => {
                      this.handleHighlight(index);
                    }}
                  >
                    Highlight on Map
                  </Button>
                )}
                store={store}
                index={index}
              />
            ))}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAgAnqHQF4Z6NpppDIGCA1gYD367qOPKFs'
})(withRouter(withStyles(styles)(StoreMap)));
