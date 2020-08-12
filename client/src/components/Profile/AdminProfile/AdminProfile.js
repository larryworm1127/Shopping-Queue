import React from 'react';
import Grid from '@material-ui/core/Grid';
import DataDisplay from '../../DataDisplay';
import ProfileEditButtons from '../ProfileEditButtons';
import { getAdminProfile, updateAdminProfile } from '../../../actions/admin';


class AdminPage extends React.Component {

  componentDidMount() {
    getAdminProfile(this.props.username, this);
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

  handleFormField = (field, event) => {
    this.setState({
      [field]: event.target.value,
    });
  };

  handleSave = (event) => {
    event.preventDefault();

    updateAdminProfile(this.props.currentUser, this);
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
            // TODO: remove value prop and replace it with content
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
        </Grid>
        <br />

        <ProfileEditButtons
          edit={this.state.edit}
          setEdit={this.setEdit}
          handleSave={this.handleSave}
        />
      </React.Fragment>
    );
  }
}

export default AdminPage;
