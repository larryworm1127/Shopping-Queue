import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import UserProfile from '../ShopperProfile/ShopperProfile';
import SearchHistory from '../ShopperProfile/SearchHistory';
import QueueHistory from '../ShopperProfile/QueueHistory';
import Grid from '@material-ui/core/Grid';
import { styles } from '../style';
import { withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DeleteIcon from '@material-ui/icons/Delete';
import { shoppers } from '../../../utils/shoppers';


class ShoppersProfile extends React.Component {

  state = {
    stateView: 0,
    profileOpenIndex: 0
  };

  closeView(index) {
    const { classes } = this.props;
    const { stateView, profileOpenIndex } = this.state;

    if (stateView !== 0 && profileOpenIndex === index) {
      return (
        <Button
          className={classes.button}
          onClick={() => this.setState({ stateView: 0 })}
          variant="contained"
          color="primary"
        >
          Close
        </Button>
      );
    }
  };

  getView(index, shopperUsername) {
    const shopper = shoppers[index];

    switch (this.state.stateView) {
      case 1:
        return <UserProfile username={shopperUsername}/>;
      case 2:
        return <SearchHistory shopper={shopper}/>;
      case 3:
        return <QueueHistory shopper={shopper}/>;
      default:
        return;
    }
  };

  render() {
    const { classes } = this.props;
    const { stateView, profileOpenIndex } = this.state;

    return (
      <React.Fragment>
        <Grid container spacing={3}>
          {shoppers.map((shopper, index) => (
            <Grid item xs={12} key={index}>
              <Card>
                <CardContent>
                  <Typography
                    component="h2"
                    variant="h5"
                    color="primary"
                    gutterBottom
                  >
                    {shopper.firstName} {shopper.lastName}
                  </Typography>
                  <Typography color="textSecondary" className={classes.secondaryText}>
                    Email: {shopper.email}
                  </Typography>
                  <Typography color="textSecondary" className={classes.secondaryText}>
                    Location: {shopper.address}
                  </Typography>
                  <Button
                    className={classes.button}
                    onClick={() => this.setState({ stateView: 1, profileOpenIndex: index })}
                    variant="contained"
                    color="primary"
                  >
                    View Profile
                  </Button>
                  <Button
                    className={classes.button}
                    onClick={() => this.setState({ stateView: 2, profileOpenIndex: index })}
                    variant="contained"
                    color="primary"
                  >
                    View Search History
                  </Button>
                  <Button
                    className={classes.button}
                    onClick={() => this.setState({ stateView: 3, profileOpenIndex: index })}
                    variant="contained"
                    color="primary"
                  >
                    View Queue History
                  </Button>
                  <Button
                    className={classes.deleteButton}
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon/>}
                  >
                    Delete User
                  </Button>

                  {this.closeView(index)}

                  {(stateView !== 0) && (profileOpenIndex === index) && (
                    <div className={classes.adminUserProfile}>
                      {this.getView(index, shopper.username)}
                    </div>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ShoppersProfile);
