import React from 'react';
import Grid from '@material-ui/core/Grid';
import StoreCards from '../../StoreCards';
import { uid } from 'react-uid';
import DataDisplay from '../../DataDisplay';
import Button from '@material-ui/core/Button';
import ProfileEditButtons from '../ProfileEditButtons';


class ShopperProfile extends React.Component {

  constructor(props) {
    super(props);
    const { shopper } = this.props;
    this.state = {
      edit: false,
      firstName: shopper.firstName,
      lastName: shopper.lastName,
      email: shopper.email,
      address: shopper.address,
      favoriteStores: shopper.favoriteStores,
      remindTime: shopper.remindTime
    };
  }

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
  };


  addNewFav = (Fav) => {
    this.state.favoriteStores.push(Fav);
  };

  // handleFavorite = (event, selectedStore) => {
  //   event.preventDefault();
  //   ShopperProfile.addNewFav(selectedStore);

  // };
  getFavStoreDisplayComponent = (shopper) => {
    return shopper.favoriteStores.map((store, index) => (
      <Grid item md={4} key={uid(index)}>
        <StoreCards store={store} index={index}/>
      </Grid>
    ));
  };

  getFavStoreEditComponent = () => {
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

    const { shopper } = this.props;
    this.setEdit(false);
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
    const { shopper } = this.props;

    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <DataDisplay
            gridSize={3}
            title="Your First Name"
            content={shopper.firstName}
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
            content={shopper.lastName}
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
            content={shopper.email}
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
            content={shopper.address}
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
                {this.getFavStoreDisplayComponent(shopper)}
              </Grid>
            }
            editComponent={
              <Grid container spacing={3}>
                {this.getFavStoreEditComponent(shopper)}
              </Grid>
            }
            edit={this.state.edit}
            setEdit={this.setEdit}
          />
          <DataDisplay
            gridSize={12}
            title="Notification Settings"
            content={`Remind me ${shopper.remindTime} minutes before my booking.`}
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

export default ShopperProfile;
