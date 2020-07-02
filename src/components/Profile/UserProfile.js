import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import StoreCards from '../StoreCards';
import { styles } from './style';
import { withStyles } from '@material-ui/core';


class UserProfile extends React.Component {

  render() {
    const { classes, shopper } = this.props;

    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="h5" color="primary" gutterBottom>
                Your Name
              </Typography>
              <Typography component="p" variant="h6">
                {`${shopper.firstName} ${shopper.lastName}`}
              </Typography>
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
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="h5" color="primary" gutterBottom>
                Your Favourite Stores:
              </Typography>
              <Grid container spacing={3}>
                {shopper.favoriteStores.map((store, index) => (
                  <Grid item md={4} key={index}>
                    <StoreCards
                      handleHighlight={this.handleHighlight}
                      store={store}
                      index={index}
                      disableHighlight={true}
                    />
                  </Grid>
                ))}
              </Grid>
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
              {/*<FormControl>*/}
              {/*  <Select*/}
              {/*    value={this.state.notificationTime}*/}
              {/*    onChange={this.handleChange}*/}
              {/*    displayEmpty*/}
              {/*    inputProps={{ 'aria-label': 'Without label', 'left-margin': '8px' }}*/}
              {/*  >*/}
              {/*    <MenuItem value="">*/}
              {/*      <em>None</em>*/}
              {/*    </MenuItem>*/}
              {/*    <MenuItem value={15}>15</MenuItem>*/}
              {/*    <MenuItem value={30}>30</MenuItem>*/}
              {/*    <MenuItem value={45}>45</MenuItem>*/}
              {/*    <MenuItem value={60}>60</MenuItem>*/}
              {/*  </Select>*/}
              {/*</FormControl>*/}
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(UserProfile);
