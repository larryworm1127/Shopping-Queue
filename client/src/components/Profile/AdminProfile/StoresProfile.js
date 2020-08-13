import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import StoreProfile from '../StoreProfile/StoreProfile';
import { styles } from '../style';
import { withStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { getAllStores, removeStore } from '../../../actions/admin';
import { uid } from 'react-uid';
import RemoveConfirmDialog from '../../RemoveConfirmDialog';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import { getSearchedStores } from '../../../actions/store';


class StoresProfile extends React.Component {

  componentDidMount() {
    getSearchedStores("", this);
  }

  state = {
    alertOpen: false,
    isProfileOpen: false,
    profileOpenIndex: 0,
    stores: []
  };

  handleUserDelete = (index, username) => {
    removeStore(username, index, this);
  };

  setAlertOpen = (value) => {
    this.setState({
      alertOpen: value
    });
  };

  closeView(index) {
    const { classes } = this.props;
    const { isProfileOpen, profileOpenIndex } = this.state;

    if (isProfileOpen && profileOpenIndex === index) {
      return (
        <Button
          className={classes.button}
          onClick={() => this.setState({ isProfileOpen: false })}
          variant="contained"
          color="primary"
        >
          Close
        </Button>
      );
    }
  };

  handleOnInputChange = (event) => {
    getSearchedStores(event.target.value, this)
  };

  render() {
    const { classes } = this.props;
    const { isProfileOpen, profileOpenIndex } = this.state;

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
        {this.state.stores.map((store, index) => (
          <Box m={2} key={uid(store)}>
            <Card>
              <CardContent>
                <Typography
                  component="h2"
                  variant="h5"
                  color="primary"
                  gutterBottom
                >
                  {store.storeName}
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
                  onClick={() => this.setState({
                    isProfileOpen: true,
                    profileOpenIndex: index
                  })}
                  variant="contained"
                  color="primary"
                >
                  Store Profile
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
                  removeThunk={() => this.handleUserDelete(index, store.username)}
                  removeType="Store"
                />

                {this.closeView(index)}

                {(isProfileOpen) && (profileOpenIndex === index) && (
                  <div className={classes.adminUserProfile}>
                    <StoreProfile username={store.username}/>
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

export default withStyles(styles)(StoresProfile);
