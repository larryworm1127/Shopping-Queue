import React from 'react';
import Grid from '@material-ui/core/Grid';
import StoreCards from '../../StoreCards';
import { uid } from 'react-uid';
import ProfileDataDisplay from '../ProfileDataDisplay';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import { styles } from './style';


class UserProfile extends React.Component {

  constructor(props) {
    super(props);
    const { shopper } = this.props;
    this.state = {
      firstName: shopper.firstName,
      lastName: shopper.lastName,
      email: shopper.email,
      address: shopper.address,
      favoriteStores: shopper.favoriteStores,
      remindTime: shopper.remindTime
    };
  }

  handleFormField = (field, event) => {
    this.setState({
      [field]: event.target.value,
    });
  };

  handleRemoveFavStore = (event, index) => {
    event.preventDefault();

    const newFavoriteStores = [...this.state.favoriteStores];
    newFavoriteStores.splice(index, 1);
    this.setState({
      favoriteStores: newFavoriteStores
    });
  };

  getFavStoreDisplayComponent = (shopper) => {
    return shopper.favoriteStores.map((store, index) => (
      <Grid item md={4} key={uid(index)}>
        <StoreCards store={store} index={index}/>
      </Grid>
    ));
  };

  getFavStoreEditComponent = (shopper) => {
    return this.state.favoriteStores.map((store, index) => (
      <Grid item md={4} key={uid(index)}>
        <StoreCards
          store={store}
          index={index}
          disableQueue={true}
          secondButton={
            <Button
              variant="outlined"
              color="primary"
              onClick={event => {
                this.handleRemoveFavStore(event, index);
              }}
            >
              Remove
            </Button>
          }
        />
      </Grid>
    ));
  };

  handleSave = (event) => {
    event.preventDefault();

    const { setEdit, shopper } = this.props;
    setEdit(false);
    shopper.updateUserProfile(
      this.state.firstName,
      this.state.lastName,
      this.state.address,
      this.state.email,
      this.state.remindTime,
      this.state.favoriteStores
    );
  };

  render() {
    const { classes, shopper, setEdit, edit } = this.props;

    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <ProfileDataDisplay
            gridSize={3}
            title="Your First Name"
            content={shopper.firstName}
            edit={edit}
            setEdit={setEdit}
            name="firstName"
            label="First Name"
            value={this.state.firstName}
            handleFormField={this.handleFormField}
          />
          <ProfileDataDisplay
            gridSize={3}
            title="Your Last Name"
            content={shopper.lastName}
            edit={edit}
            setEdit={setEdit}
            name="lastName"
            label="Last Name"
            value={this.state.lastName}
            handleFormField={this.handleFormField}
          />
          <ProfileDataDisplay
            gridSize={6}
            title="Your Email"
            content={shopper.email}
            edit={edit}
            setEdit={setEdit}
            name="email"
            label="Email"
            value={this.state.email}
            handleFormField={this.handleFormField}
          />
          <ProfileDataDisplay
            gridSize={12}
            title="Your Location"
            content={shopper.address}
            edit={edit}
            setEdit={setEdit}
            name="address"
            label="Address"
            value={this.state.address}
            handleFormField={this.handleFormField}
          />
          <ProfileDataDisplay
            gridSize={12}
            title="Your Favorite Stores"
            contentComponent={
              <Grid container spacing={3}>
                {
                  (edit) ?
                  this.getFavStoreEditComponent(shopper) :
                  this.getFavStoreDisplayComponent(shopper)
                }
              </Grid>
            }
            edit={edit}
            setEdit={setEdit}
          />
          <ProfileDataDisplay
            gridSize={12}
            title="Notification Settings"
            content={`Remind me ${shopper.remindTime} minutes before my booking.`}
            edit={edit}
            setEdit={setEdit}
            name="remindTime"
            label="Minutes before my booking to remind me."
            value={this.state.remindTime}
            handleFormField={this.handleFormField}
          />
        </Grid>
        <br/>

        {edit && (
          <Grid item xs={12}>
            <Button
              className={classes.bottomButton}
              variant="contained"
              color="primary"
              onClick={this.handleSave}
            >
              Save
            </Button>

            <Button
              className={classes.bottomButton}
              variant="contained"
              color="primary"
              onClick={() => {
                setEdit(false);
              }}
            >
              Cancel
            </Button>
          </Grid>
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(UserProfile);
