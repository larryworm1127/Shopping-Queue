import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { styles } from './styles';
import { withStyles } from '@material-ui/core';

class StoreSettings extends React.Component {
  render() {
    const { classes, store } = this.props;
    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="h5" color="primary" gutterBottom>
                Store Capacity Limit
              </Typography>
              <Typography component="p" variant="h6">
                {store.customerLimit}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="h5" color="primary" gutterBottom>
                Customer Time Limit
              </Typography>
              <Typography component="p" variant="h6">
                {store.customerShopTime}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(StoreSettings);