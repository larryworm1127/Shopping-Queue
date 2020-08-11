import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import StoreSettings from '../StoreProfile/StoreSettings';
import StoreProfile from '../StoreProfile/StoreProfile';
import { styles } from '../style';
import { withStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { stores } from '../../../utils/stores';


class OwnersProfile extends React.Component {

  state = {
    profileViews: new Array(stores.length).fill(0)
  };

  closeView(index) {
    const stateView = this.state.profileViews[index];
    const { classes } = this.props;

    if (stateView !== 0) {
      return (
        <Button
          className={classes.button}
          onClick={() => this.handleViewChange(index, 0)}
          variant="contained"
          color="primary"
        >
          Close
        </Button>
      );
    }
  };

  handleViewChange(index, newProfileView) {
    const viewsOpen = [...this.state.profileViews];
    viewsOpen[index] = newProfileView;

    this.setState({
      profileViews: viewsOpen
    });
  };

  getView(index) {
    const store = stores[index];
    const stateView = this.state.profileViews[index];
    switch (stateView) {
      case 1:
        return <StoreProfile store={store}/>;
      case 2:
        return <StoreSettings store={store}/>;
      default:
        return;
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        {stores.map((store, index) => (
          <Box m={2}>
            <Card>
              <CardContent>
                <Typography
                  component="h2"
                  variant="h5"
                  color="primary"
                  gutterBottom
                >
                  {store.name}
                </Typography>
                <Typography
                  color="textSecondary"
                  className={classes.secondaryText}
                >
                  Email: {store.email}
                </Typography>
                <Typography
                  color="textSecondary"
                  className={classes.secondaryText}
                >
                  Location: {store.address}
                </Typography>
                <Button
                  className={classes.button}
                  onClick={() => this.handleViewChange(index, 1)}
                  variant="contained"
                  color="primary"
                >
                  Store Profile
                </Button>
                <Button
                  className={classes.button}
                  onClick={() => this.handleViewChange(index, 2)}
                  variant="contained"
                  color="primary"
                >
                  Store Settings
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

                {(this.state.profileViews[index] !== 0) && (
                  <div className={classes.adminUserProfile}>
                    {this.getView(index)}
                  </div>
                )}
              </CardContent>
            </Card>
          </Box>
        ))}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(OwnersProfile);
