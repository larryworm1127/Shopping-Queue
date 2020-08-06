import React from 'react';
import Grid from '@material-ui/core/Grid';
import DataDisplay from '../../DataDisplay';
import ProfileEditButtons from '../ProfileEditButtons';
import { StoreTypes } from '../../../utils/stores';
import FormSelectField from '../../FormSelectField';

class StoreProfile extends React.Component {

  constructor(props) {
    super(props);
    const { store } = this.props;
    this.state = {
      edit: false,
      storeName: store.name,
      email: store.email,
      address: store.address,
      storeType: store.type
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
      this.state.storeType
    );
  };

  render() {
    const { store } = this.props;

    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <DataDisplay
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
          <DataDisplay
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
          <DataDisplay
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
          <DataDisplay
            gridSize={12}
            title="Store Type"
            content={store.type}
            edit={this.state.edit}
            setEdit={this.setEdit}
            editComponent={
              <FormSelectField
                name="storeType"
                label="Store Type"
                handleFormField={this.handleFormField}
                value={this.state.storeType}
                useIndex={false}
                menuItems={Object.keys(StoreTypes)}
              />
            }
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

export default StoreProfile;
