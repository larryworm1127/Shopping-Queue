import React from 'react';
import Grid from '@material-ui/core/Grid';
import DataDisplay from '../../DataDisplay';
import { uid } from 'react-uid';
import StoreCards from '../../StoreCards';
import Button from '@material-ui/core/Button';
import { getShopperFavoriteStores } from '../../../actions/shopper';


class FavoriteStores extends React.Component {

  componentDidMount() {
    getShopperFavoriteStores(this.props.username, this);
  }

  state = {
    favoriteStores: []
  };

  handleRemoveFavStore = (event, index) => {
    event.preventDefault();

    const newFavoriteStores = [...this.state.favoriteStores];
    newFavoriteStores.splice(index, 1);
    this.setState({
      favoriteStores: newFavoriteStores
    });

    // Need to update the back-end here. Add later.
  };

  addNewFav = (Fav) => {
    this.state.favoriteStores.push(Fav);
  };

  getFavStoreDisplayComponent = () => {
    console.log(this.state.favoriteStores);
    return this.state.favoriteStores.map((store, index) => (
      <Grid item md={4} key={uid(store)}>
        <StoreCards store={store} index={index}/>
      </Grid>
    ));
  };

  getFavStoreEditComponent = () => {
    console.log(this.state);
    return this.state.favoriteStores.map((store, index) => (
      <Grid item md={4} key={uid(index)}>
        <StoreCards
          store={store}
          index={index}
          disableQueue={true}
          secondButton={
            <Button
              variant="outlined"
              color="primary"
              onClick={event => {
                this.handleRemoveFavStore(event, index);
              }}
            >
              Remove
            </Button>
          }
        />
      </Grid>
    ));
  };

  render() {
    return (
      <React.Fragment>
        <DataDisplay
          gridSize={12}
          title="Your Favorite Stores"
          contentComponent={
            <Grid container spacing={3}>
              {this.getFavStoreDisplayComponent()}
            </Grid>
          }
          editComponent={
            <Grid container spacing={3}>
              {this.getFavStoreEditComponent()}
            </Grid>
          }
          edit={this.state.edit}
          setEdit={this.setEdit}
        />
      </React.Fragment>
    );
  }
}

export default FavoriteStores;
