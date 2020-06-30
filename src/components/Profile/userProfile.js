import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import RoomIcon from '@material-ui/icons/Room';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from "@material-ui/core/Box";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import "./userProfile.css";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 300,
  }
});


class UserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {notificationTime: 15};
  }

  setNotificationTime(newTime) {
    this.setState({notificationTime: newTime});
  }

  handleChange = (event) => {
    this.setNotificationTime(event.target.value);
  }

  render() {
    return (
      <React.Fragment>
        <Box m={2}>
          <Typography variant='h5' component='h5'>
            Your Location:
          </Typography>
          <Card variant="outlined">
            <CardContent>
              <Typography component='p'><RoomIcon/> Toronto, ON</Typography>
            </CardContent>
          </Card>
        </Box>
        <Box m={2}>
          <Typography variant='h5' component='h5'>
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
        </Box>
        <Box m={2}>
        <Typography variant='h5' component='h5'>
            Notification Settings:
          </Typography>
          <Card variant="outlined">
            <CardContent>
              <h3 className="inline-text">Remind me</h3>
              <FormControl>
                <Select
                  value={this.state.notificationTime}
                  onChange={this.handleChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label', 'left-margin': '8px' }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                  <MenuItem value={45}>45</MenuItem>
                  <MenuItem value={60}>60</MenuItem>
                </Select>
              </FormControl>
              <h3 className="inline-text right-text"> minutes before my booking.</h3>
            </CardContent>
          </Card>
        </Box>
      </React.Fragment>
    );
  }
}

export default UserProfile;