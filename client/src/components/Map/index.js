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
import { uid } from 'react-uid';
import { getAllStores } from '../../actions/admin';


class StoreMap extends React.Component {

  componentDidMount() {
    getAllStores(this)
  }

  state = {
    currStore: null,
    showMarker: false,
    stores: []
  };

  handleHighlight = (index) => {
    this.setState({
      currStore: stores[index],
      showMarker: true
    });
  };

  renderMarkers = () => {
    const { currStore, showMarker } = this.state;

    if (currStore !== null) {
      return (
        <Marker
          position={{
            lat: currStore.coordinate[0],
            lng: currStore.coordinate[1]
          }}
          visible={showMarker}
        />
      );
    }
  };

  render() {
    const { classes, google, isLoggedIn, userType } = this.props;

    return (
      <React.Fragment>
        <NavBar position='fixed' userType={userType} isLoggedIn={isLoggedIn}/>
        <CssBaseline/>

        <Grid container>
          <Grid item xs={9} className={classes.mapStyles}>
            <Map
              google={google}
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

            {this.state.stores.map((store, index) => (
              <div className={classes.storeCard} key={uid(store)}>
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
              </div>
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
