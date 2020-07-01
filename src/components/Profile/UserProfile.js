import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';


class UserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = { notificationTime: 15 };
  }

  setNotificationTime(newTime) {
    this.setState({ notificationTime: newTime });
  }

  handleChange = (event) => {
    this.setNotificationTime(event.target.value);
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="h5" color="primary" gutterBottom>
                Your Location
              </Typography>
              <Typography component="p" variant="h6">
                100 St. George Street, Toronto, ON
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="h5" color="primary" gutterBottom>
                Your Favourite Stores:
              </Typography>
              <Grid container spacing={3}>
                <Grid item md={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography component='h5'>
                        FloorMart
                      </Typography>
                      <Typography component='p'>Image of store here</Typography>
                      This restaurant is a good place to buy general items
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item md={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography component='h5'>
                        FloorMart
                      </Typography>
                      <Typography component='p'>Image of store here</Typography>
                      This restaurant is a good place to buy general items
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="h5" color="primary" gutterBottom>
                Notification Settings:
              </Typography>
              <Typography component="p" variant="h6">
                Remind me 15 minutes before my booking.
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

export default UserProfile;
