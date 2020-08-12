import React from 'react';
import Grid from '@material-ui/core/Grid';
import StoreCards from '../../StoreCards';
import { uid } from 'react-uid';
import DataDisplay from '../../DataDisplay';
import Button from '@material-ui/core/Button';
import ProfileEditButtons from '../ProfileEditButtons';
import { getShopperProfile, updateShopperProfile } from '../../../actions/shopper';


class UserProfile extends React.Component {

  componentDidMount() {
    getShopperProfile(this.props.username, this);
  }

  state = {
    edit: false,
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    remindTime: 0,
    favoriteStores: [],
    searchHistory: [],
    queueHistory: []
  };

  setEdit = (val) => {
    this.setState({ edit: val });
  };

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

    // Need to update the back-end here. Add later.
  };

  addNewFav = (Fav) => {
    this.state.favoriteStores.push(Fav);
  };

  getFavStoreDisplayComponent = () => {
    console.log('Hello');
    console.log(this.state.favoriteStores);
    return this.state.favoriteStores.map((store, index) => (
      <Grid item md={4} key={uid(index)}>
        <StoreCards store={store} index={index}/>
      </Grid>
    ));
  };

  getFavStoreEditComponent = () => {
    console.log(this.state);
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

    updateShopperProfile(this.props.username, this);
  };

  render() {
    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <DataDisplay
            gridSize={3}
            title="Your First Name"
            content={this.state.firstName}
            edit={this.state.edit}
            setEdit={this.setEdit}
            name="firstName"
            label="First Name"
            value={this.state.firstName}
            handleFormField={this.handleFormField}
          />
          <DataDisplay
            gridSize={3}
            title="Your Last Name"
            content={this.state.lastName}
            edit={this.state.edit}
            setEdit={this.setEdit}
            name="lastName"
            label="Last Name"
            value={this.state.lastName}
            handleFormField={this.handleFormField}
          />
          <DataDisplay
            gridSize={6}
            title="Your Email"
            content={this.state.email}
            edit={this.state.edit}
            setEdit={this.setEdit}
            name="email"
            label="Email"
            value={this.state.email}
            handleFormField={this.handleFormField}
          />
          <DataDisplay
            gridSize={12}
            title="Your Location"
            content={this.state.address}
            edit={this.state.edit}
            setEdit={this.setEdit}
            name="address"
            label="Address"
            value={this.state.address}
            handleFormField={this.handleFormField}
          />
          <DataDisplay
            gridSize={12}
            title="Your Favorite Stores"
            contentComponent={
              <Grid container spacing={3}>
                {this.getFavStoreDisplayComponent}
              </Grid>
            }
            editComponent={
              <Grid container spacing={3}>
                {this.getFavStoreEditComponent}
              </Grid>
            }
            edit={this.state.edit}
            setEdit={this.setEdit}
          />
          <DataDisplay
            gridSize={12}
            title="Notification Settings"
            content={`Remind me ${this.state.remindTime} minutes before my booking.`}
            edit={this.state.edit}
            setEdit={this.setEdit}
            name="remindTime"
            label="Minutes before my booking to remind me."
            value={this.state.remindTime}
            handleFormField={this.handleFormField}
          />
        </Grid>
        <br/>

        <ProfileEditButtons
          edit={this.state.edit}
          setEdit={this.setEdit}
          handleSave={this.handleSave}
        />
      </React.Fragment>
    );
  }
}

export default UserProfile;
