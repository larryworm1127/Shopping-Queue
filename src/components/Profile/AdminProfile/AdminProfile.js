import React from 'react';
import Grid from '@material-ui/core/Grid';
import ProfileDataDisplay from '../ProfileDataDisplay';
import ProfileEditButtons from '../ProfileEditButtons';


class AdminPage extends React.Component {

  constructor(props) {
    super(props);
    const { admin } = this.props;
    this.state = {
      edit: false,
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      address: admin.address,
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

    const { admin } = this.props;
    this.setEdit(false);
    admin.updateUserProfile(
      this.state.firstName,
      this.state.lastName,
      this.state.address,
      this.state.email,
    );
  };

  render() {
    const { admin } = this.props;

    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <ProfileDataDisplay
            gridSize={3}
            title="Your First Name"
            content={admin.firstName}
            edit={this.state.edit}
            setEdit={this.setEdit}
            name="firstName"
            label="First Name"
            value={this.state.firstName}
            handleFormField={this.handleFormField}
          />
          <ProfileDataDisplay
            gridSize={3}
            title="Your Last Name"
            content={admin.lastName}
            edit={this.state.edit}
            setEdit={this.setEdit}
            name="lastName"
            label="Last Name"
            value={this.state.lastName}
            handleFormField={this.handleFormField}
          />
          <ProfileDataDisplay
            gridSize={6}
            title="Your Email"
            content={admin.email}
            edit={this.state.edit}
            setEdit={this.setEdit}
            name="email"
            label="Email"
            value={this.state.email}
            handleFormField={this.handleFormField}
          />
          <ProfileDataDisplay
            gridSize={12}
            title="Your Location"
            content={admin.address}
            edit={this.state.edit}
            setEdit={this.setEdit}
            name="address"
            label="Address"
            value={this.state.address}
            handleFormField={this.handleFormField}
          />
        </Grid>

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