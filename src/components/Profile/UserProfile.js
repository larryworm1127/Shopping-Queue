import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import StoreCards from '../StoreCards';
import { styles } from './style';
import { withStyles } from '@material-ui/core';
import { uid } from 'react-uid';
import Link from '@material-ui/core/Link';


class UserProfile extends React.Component {

  render() {
    const { classes, shopper, setEdit } = this.props;

    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="h5" color="primary" gutterBottom>
                Your First Name
              </Typography>
              <Typography component="p" variant="h6">
                {shopper.firstName}
              </Typography>

              <div className={classes.edit}>
                <Link color="primary" onClick={() => setEdit(true)}>
                  Edit
                </Link>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="h5" color="primary" gutterBottom>
                Your Last Name
              </Typography>
              <Typography component="p" variant="h6">
                {shopper.lastName}
              </Typography>

              <div className={classes.edit}>
                <Link color="primary" onClick={() => setEdit(true)}>
                  Edit
                </Link>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="h5" color="primary" gutterBottom>
                Your Email
              </Typography>
              <Typography component="p" variant="h6">
                {shopper.email}
              </Typography>

              <div className={classes.edit}>
                <Link color="primary" onClick={() => setEdit(true)}>
                  Edit
                </Link>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="h5" color="primary" gutterBottom>
                Your Location
              </Typography>
              <Typography component="p" variant="h6">
                {shopper.address}
              </Typography>

              <div className={classes.edit}>
                <Link color="primary" onClick={() => setEdit(true)}>
                  Edit
                </Link>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="h5" color="primary" gutterBottom>
                Your Favourite Stores:
              </Typography>
              <Grid container spacing={3}>
                {shopper.favoriteStores.map((store, index) => (
                  <Grid item md={4} key={uid(index)}>
                    <StoreCards store={store} index={index}/>
                  </Grid>
                ))}
              </Grid>

              <div className={classes.edit}>
                <Link color="primary" onClick={() => setEdit(true)}>
                  Edit
                </Link>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="h5" color="primary" gutterBottom>
                Notification Settings:
              </Typography>
              <Typography component="p" variant="h6">
                Remind me {shopper.remindTime} minutes before my booking.
              </Typography>

              <div className={classes.edit}>
                <Link color="primary" onClick={() => setEdit(true)}>
                  Edit
                </Link>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(UserProfile);
