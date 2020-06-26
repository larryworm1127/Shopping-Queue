import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import RoomIcon from '@material-ui/icons/Room';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 300,
  }
});


class UserProfile extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Typography variant='h5' component='h5'>
          Your Location:
        </Typography>
        <Typography component='p'><RoomIcon/> Toronto, ON</Typography>
        <Typography variant='h5' component='h5'>
          Your Favourite Stores:
        </Typography>
        <Grid container xs={8} spacing={3}>
          <Grid item md={4}>
            <Card>
              <CardContent>
                <Typography component='h5'>
                  FloorMart
                </Typography>
                <Typography component='p'>Image of store here</Typography>
                This restaurant is a good palce to buy general items
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4}>
            <Card>
              <CardContent>
                <Typography component='h5'>
                  FloorMart
                </Typography>
                <Typography component='p'>Image of store here</Typography>
                This restaurant is a good palce to buy general items
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default UserProfile;