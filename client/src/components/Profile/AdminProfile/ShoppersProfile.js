import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import UserProfile from '../ShopperProfile/ShopperProfile';
import SearchHistory from '../ShopperProfile/SearchHistory';
import QueueHistory from '../ShopperProfile/QueueHistory';
import { styles } from '../style';
import { withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeShopper } from '../../../actions/admin';
import { uid } from 'react-uid';
import FavoriteStores from '../ShopperProfile/FavoriteStores';
import Box from '@material-ui/core/Box';
import RemoveConfirmDialog from '../../RemoveConfirmDialog';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import { getSearchedShoppers } from '../../../actions/shopper';


class ShoppersProfile extends React.Component {

  componentDidMount() {
    getSearchedShoppers('', this);
  }

  state = {
    alertOpen: false,
    stateView: 0,
    profileOpenIndex: 0,
    shoppers: []
  };

  closeView = (index) => {
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

  handleUserDelete = (index, username) => {
    removeShopper(username, index, this);
  };

  setAlertOpen = (value) => {
    this.setState({
      alertOpen: value
    });
  };

  getView = (index, username) => {
    switch (this.state.stateView) {
      case 1:
        return <UserProfile username={username}/>;
      case 2:
        return <FavoriteStores username={username}/>;
      case 3:
        return <SearchHistory username={username}/>;
      case 4:
        return <QueueHistory username={username}/>;
      default:
        return;
    }
  };

  handleOnInputChange = (event) => {
    getSearchedShoppers(event.target.value, this);
  };

  render() {
    const { classes } = this.props;
    const { stateView, profileOpenIndex } = this.state;

    return (
      <React.Fragment>
        <Card>
          <CardActions>
            <TextField
              variant="outlined"
              label="Search..."
              onChange={this.handleOnInputChange}
            />
            <Button
              size="small"
              color="primary"
            >
              Search
            </Button>
          </CardActions>
        </Card>
        {this.state.shoppers.map((shopper, index) => (
          <Box m={2} key={uid(shopper)}>
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
                  View Favorite Stores
                </Button>
                <Button
                  className={classes.button}
                  onClick={() => this.setState({ stateView: 3, profileOpenIndex: index })}
                  variant="contained"
                  color="primary"
                >
                  View Search History
                </Button>
                <Button
                  className={classes.button}
                  onClick={() => this.setState({ stateView: 4, profileOpenIndex: index })}
                  variant="contained"
                  color="primary"
                >
                  View Queue History
                </Button>
                <Button
                  className={classes.deleteButton}
                  onClick={() => this.setAlertOpen(true)}
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon/>}
                >
                  Delete User
                </Button>

                <RemoveConfirmDialog
                  alertOpen={this.state.alertOpen}
                  setAlertOpen={this.setAlertOpen}
                  removeThunk={() => this.handleUserDelete(index, shopper.username)}
                  removeType="Shopper"
                />

                {this.closeView(index)}

                {(stateView !== 0) && (profileOpenIndex === index) && (
                  <div className={classes.adminUserProfile}>
                    {this.getView(index, shopper.username)}
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

export default withStyles(styles)(ShoppersProfile);
