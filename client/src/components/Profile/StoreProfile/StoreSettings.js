import React from 'react';
import Grid from '@material-ui/core/Grid';
import DataDisplay from '../../DataDisplay';
import ProfileEditButtons from '../ProfileEditButtons';


class StoreSettings extends React.Component {

  constructor(props) {
    super(props);
    const { store } = this.props;
    this.state = {
      edit: false,
      openTime: store.openingTime,
      closeTime: store.closingTime,
      customerLimit: store.customerLimit,
      customerShopTime: store.customerShopTime
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
    store.updateStoreSettings(
      this.state.customerLimit,
      this.state.customerShopTime,
      this.state.openTime,
      this.state.closeTime,
    );
  };

  render() {
    const { store } = this.props;

    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <DataDisplay
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
          <DataDisplay
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
          <DataDisplay
            gridSize={12}
            title="Customer Limit"
            content={store.customerLimit}
            edit={this.state.edit}
            setEdit={this.setEdit}
            name="customerLimit"
            label="Customer Limit"
            type="number"
            value={this.state.customerLimit}
            handleFormField={this.handleFormField}
          />
          <DataDisplay
            gridSize={12}
            title="Customer Shopping Time Limit (min)"
            content={store.customerShopTime}
            edit={this.state.edit}
            setEdit={this.setEdit}
            name="customerShopTime"
            label="Customer Shopping Time Limit (min)"
            type="number"
            value={this.state.customerShopTime}
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

export default StoreSettings;
