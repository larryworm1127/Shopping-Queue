import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { styles } from './style';
import { withStyles } from '@material-ui/core';

class AdminPage extends React.Component {
  render() {
    const {classes, admin } = this.props;

    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="h5" color="primary" gutterBottom>
                Your Name
              </Typography>
              <Typography component="p" variant="h6">
                {`${admin.firstName} ${admin.lastName}`}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="h5" color="primary" gutterBottom>
                Your Email
              </Typography>
              <Typography component="p" variant="h6">
                {admin.email}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="h5" color="primary" gutterBottom>
                Your Location
              </Typography>
              <Typography component="p" variant="h6">
                {admin.address}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AdminPage);