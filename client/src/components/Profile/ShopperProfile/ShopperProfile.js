import React from 'react';
import Grid from '@material-ui/core/Grid';
import DataDisplay from '../../DataDisplay';
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
  };

  setEdit = (val) => {
    this.setState({ edit: val });
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
            comp={this}
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
            comp={this}
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
            comp={this}
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
            comp={this}
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
