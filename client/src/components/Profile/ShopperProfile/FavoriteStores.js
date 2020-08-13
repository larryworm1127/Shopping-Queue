import React from 'react';
import Grid from '@material-ui/core/Grid';
import { uid } from 'react-uid';
import StoreCards from '../../StoreCards';
import Button from '@material-ui/core/Button';
import { getShopperFavoriteStores } from '../../../actions/shopper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import { styles } from '../style';


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

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="h5" color="primary" gutterBottom>
                Your Favorite Stores
              </Typography>

              <Grid container spacing={3}>
                {this.state.favoriteStores.map((store, index) => (
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
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(FavoriteStores);
