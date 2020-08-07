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

class OwnersProfile extends React.Component {

  state = {
    profileViews: new Array(this.props.admin.viewableStores.length).fill(0)
  };

  closeView(index) {
    const { classes } = this.props;

    const stateView = this.state.profileViews[index];
    if (stateView !== 0) {
      return (
        <Button
          className={classes.button}
          onClick={() => {
            this.handleViewChange(index, 0);
          }}
          variant="contained"
          color="primary"
        >
          Close
        </Button>
      );
    }
  };

  handleViewChange(index, newProfileView) {
    let shallowCopyViewsOpen = [...this.state.profileViews];
    let shallowItem = { ...shallowCopyViewsOpen[index] };
    shallowItem = newProfileView;
    shallowCopyViewsOpen[index] = shallowItem;
    this.setState({ profileViews: shallowCopyViewsOpen });
  };

  getView(index) {
    const store = this.props.admin.viewableStores[index];
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
    const { admin, classes } = this.props;

    return (
      <React.Fragment>
        {admin.viewableStores.map((store, index) => (
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
                  onClick={() => {
                    this.handleViewChange(index, 1);
                  }}
                  variant="contained"
                  color="primary"
                >
                  Store Profile
                </Button>
                <Button
                  className={classes.button}
                  onClick={() => {
                    this.handleViewChange(index, 2);
                  }}
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
                {this.getView(index)}
              </CardContent>
            </Card>
          </Box>
        ))}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(OwnersProfile);
