import React from 'react';
import Grid from '@material-ui/core/Grid';
import { uid } from 'react-uid';
import StoreCards from '../../StoreCards';
import { getShopperFavoriteStores } from '../../../actions/shopper';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core';
import { styles } from '../style';
import ContentTitle from '../../ContentTitle';


class FavoriteStores extends React.Component {

  componentDidMount() {
    getShopperFavoriteStores(this.props.username, this);
  }

  state = {
    favoriteStores: []
  };

  render() {
    const { classes } = this.props;
    const { favoriteStores } = this.state;

    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <ContentTitle isEmpty={favoriteStores.length === 0} name="Favorite Stores"/>

            <Grid container spacing={3}>
              {favoriteStores.map((store, index) => (
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
    );
  }
}

export default withStyles(styles)(FavoriteStores);
