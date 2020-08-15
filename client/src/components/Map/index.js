import React from 'react';
import NavBar from '../Nav/navbar';
import { withRouter } from 'react-router-dom';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
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
import { getShopperFavoriteStoresMarkMap } from '../../actions/shopper';
import { getSearchedStores } from '../../actions/store';


class StoreMap extends React.Component {

  componentDidMount() {
    getSearchedStores('', this);
    getAllStores(this);
    getShopperFavoriteStoresMarkMap(this.props.currentUser, this);
  }

  state = {
    currStore: null,
    showMarker: false,
    favoriteStores: [],
    markedFavourites: [],
    stores: [],
    initialCenter: { lat: 43.662410, lng: -79.395424 }
  };

  handleHighlight = (index) => {
    const currStore = this.state.stores[index]
    this.setState({
      initialCenter: { lat: currStore.coordinate[0], lng: currStore.coordinate[1] },
      currStore: currStore,
      showMarker: true,
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

  handleOnInputChange = (event) => {
    getSearchedStores(event.target.value, this);
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
              zoom={14}
              center={this.state.initialCenter}
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
                  onChange={this.handleOnInputChange}
                />
              </CardActions>
            </Card>

            {this.state.stores.map((store, index) => (
              <div className={classes.storeCard} key={uid(store)}>
                <StoreCards
                  username={this.props.currentUser}
                  favourite={this.state.markedFavourites[index]}
                  secondButton={(
                    <Button
                      type="button"
                      color="primary"
                      onClick={() => this.handleHighlight(index)}
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
