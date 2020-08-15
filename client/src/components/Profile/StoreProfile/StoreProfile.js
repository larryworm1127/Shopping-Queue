import React from 'react';
import Grid from '@material-ui/core/Grid';
import DataDisplay from '../../DataDisplay';
import ProfileEditButtons from '../ProfileEditButtons';
import { StoreTypes } from '../../../utils/stores';
import FormSelectField from '../../FormSelectField';
import { getStoreProfile, updateStoreProfile } from '../../../actions/store';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { styles } from '../style';
import { withStyles } from '@material-ui/core';


class UserProfile extends React.Component {

  componentDidMount() {
    getStoreProfile(this.props.username, this);
  }

  state = {
    edit: false,
    storeName: '',
    email: '',
    address: '',
    storeType: '',
    openTime: '',
    closeTime: '',
    customerLimit: '',
    customerShopTime: '',
  };

  setEdit = (val) => {
    this.setState({ edit: val });
  };

  handleSave = (event) => {
    event.preventDefault();

    updateStoreProfile(this.props.username, this);
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <DataDisplay
            gridSize={6}
            title="Store Name"
            content={this.state.storeName}
            edit={this.state.edit}
            setEdit={this.setEdit}
            name="storeName"
            label="Store Name"
            value={this.state.storeName}
            comp={this}
          />
          <DataDisplay
            gridSize={6}
            title="Store Email"
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
            title="Store Location"
            content={this.state.address}
            edit={this.state.edit}
            setEdit={this.setEdit}
            name="address"
            label="Address"
            value={this.state.address}
            comp={this}
          />
          {/*<Grid item xs={12}>*/}
          {/*  <Paper className={classes.paper}>*/}
          {/*    <Typography component="h2" variant="h5" color="primary" gutterBottom>*/}
          {/*      Store Location*/}
          {/*    </Typography>*/}
          {/*    {this.getContent()}*/}
          {/*  </Paper>*/}
          {/*</Grid>*/}

          <DataDisplay
            gridSize={12}
            title="Store Type"
            content={this.state.storeType}
            edit={this.state.edit}
            setEdit={this.setEdit}
            editComponent={
              <FormSelectField
                name="storeType"
                label="Store Type"
                comp={this}
                value={this.state.storeType}
                useIndex={false}
                menuItems={Object.keys(StoreTypes)}
              />
            }
          />
          <DataDisplay
            gridSize={6}
            title="Store Hours Opening"
            content={this.state.openTime}
            edit={this.state.edit}
            setEdit={this.setEdit}
            name="openTime"
            label="Opening Time"
            type="time"
            value={this.state.openTime}
            comp={this}
          />
          <DataDisplay
            gridSize={6}
            title="Store Hours Closing"
            content={this.state.closeTime}
            edit={this.state.edit}
            setEdit={this.setEdit}
            name="closeTime"
            label="Closing Time"
            type="time"
            value={this.state.closeTime}
            comp={this}
          />
          <DataDisplay
            gridSize={6}
            title="Customer Limit"
            content={this.state.customerLimit}
            edit={this.state.edit}
            setEdit={this.setEdit}
            name="customerLimit"
            label="Customer Limit"
            type="number"
            value={this.state.customerLimit}
            comp={this}
          />
          <DataDisplay
            gridSize={6}
            title="Customer Shopping Time Limit (min)"
            content={this.state.customerShopTime}
            edit={this.state.edit}
            setEdit={this.setEdit}
            name="customerShopTime"
            label="Customer Shopping Time Limit (min)"
            type="number"
            value={this.state.customerShopTime}
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

export default withStyles(styles)(UserProfile);
