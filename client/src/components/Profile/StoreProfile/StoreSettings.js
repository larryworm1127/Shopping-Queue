import React from 'react';
import Grid from '@material-ui/core/Grid';
import ProfileEditButtons from '../ProfileEditButtons';


class StoreSettings extends React.Component {

  constructor(props) {
    super(props);
    const { store } = this.props;
    this.state = {
      edit: false,

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
