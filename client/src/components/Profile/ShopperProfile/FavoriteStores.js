import React from 'react';
import Grid from '@material-ui/core/Grid';
import { uid } from 'react-uid';
import StoreCards from '../../StoreCards';
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
                      favourite={true}
                      username={this.props.username}
                      disableQueue={true}
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
