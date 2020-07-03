import React from 'react';
import Grid from '@material-ui/core/Grid';
import { styles } from './styles';
import { withStyles } from '@material-ui/core';
import ProfileDataDisplay from '../ProfileDataDisplay';
import ProfileEditButtons from '../ProfileEditButtons';
import { stores } from '../../../utils/stores';


class StoreProfile extends React.Component {

  constructor(props) {
    super(props);
    const { store } = this.props;
    this.state = {
      edit: false,
      storeName: store.name,
      email: store.email,
      address: store.address,
      openTime: store.openingTime,
      closeTime: store.closingTime
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

  handleSave = (event) => {
    event.preventDefault();

    const { store } = this.props;
    this.setEdit(false);
    store.updateUserProfile(
      this.state.storeName,
      this.state.email,
      this.state.address,
      this.state.openTime,
      this.state.closeTime,
    );
    console.log(stores);
  };

  render() {
    const { store } = this.props;
    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <ProfileDataDisplay
            gridSize={6}
            title="Store Name"
            content={store.name}
            edit={this.state.edit}
            setEdit={this.setEdit}
            name="storeName"
            label="Store Name"
            value={this.state.storeName}
            handleFormField={this.handleFormField}
          />
          <ProfileDataDisplay
            gridSize={6}
            title="Store Email"
            content={store.email}
            edit={this.state.edit}
            setEdit={this.setEdit}
            name="email"
            label="Email"
            value={this.state.email}
            handleFormField={this.handleFormField}
          />
          <ProfileDataDisplay
            gridSize={12}
            title="Store Location"
            content={store.address}
            edit={this.state.edit}
            setEdit={this.setEdit}
            name="address"
            label="Address"
            value={this.state.address}
            handleFormField={this.handleFormField}
          />
          <ProfileDataDisplay
            gridSize={6}
            title="Store Hours Opening"
            content={store.openingTime}
            edit={this.state.edit}
            setEdit={this.setEdit}
            name="openTime"
            label="Opening Time"
            type="time"
            value={this.state.openTime}
            handleFormField={this.handleFormField}
          />
          <ProfileDataDisplay
            gridSize={6}
            title="Store Hours Closing"
            content={store.closingTime}
            edit={this.state.edit}
            setEdit={this.setEdit}
            name="closeTime"
            label="Closing Time"
            type="time"
            value={this.state.closeTime}
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

export default withStyles(styles)(StoreProfile);