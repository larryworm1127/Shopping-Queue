import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { styles } from './styles';
import { withStyles } from '@material-ui/core';

class StoreProfile extends React.Component {
  render() {
    const { classes, store } = this.props;
    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="h5" color="primary" gutterBottom>
                Store Name
              </Typography>
              <Typography component="p" variant="h6">
                {`${store.name}`}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="h5" color="primary" gutterBottom>
                Store Email
              </Typography>
              <Typography component="p" variant="h6">
                {store.email}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="h5" color="primary" gutterBottom>
                Store Location
              </Typography>
              <Typography component="p" variant="h6">
                {store.address}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="h5" color="primary" gutterBottom>
                Store Hours
              </Typography>
              <Typography component="p" variant="h6">
                Opening {store.openingTime}
              </Typography>
              <Typography component="p" variant="h6">
                Closing {store.closingTime}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(StoreProfile);