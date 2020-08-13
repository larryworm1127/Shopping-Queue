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


class StoresProfile extends React.Component {

  componentDidMount() {
    getAllStores(this);
  }

  state = {
    isProfileOpen: false,
    profileOpenIndex: 0,
    stores: []
  };

  handleUserDelete = (index, username) => {
    removeStore(username, index, this);
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

  render() {
    const { classes } = this.props;
    const { isProfileOpen, profileOpenIndex } = this.state;

    return (
      <React.Fragment>
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
                  onClick={() => this.handleUserDelete(index, store.username)}
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon/>}
                >
                  Delete User
                </Button>

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
