import React from 'react';
import { styles } from './style';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import ProfileDataDisplay from '../Profile/ProfileDataDisplay';
import ProfileEditButtons from '../Profile/ProfileEditButtons';


class BookingDetails extends React.Component {

  constructor(props) {
    super(props);
    const { booking } = this.props;
    this.state = {
      edit: false,
      date: booking.date,
      shopTime: booking.shopTime,
      numCustomer: booking.numCustomer
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

    const { booking } = this.props;
    this.setEdit(false);
    booking.updateQueue(
      this.state.date,
      this.state.shopTime,
      this.state.numCustomer
    );
  };

  render() {
    const { classes, booking } = this.props;

    return (
      <React.Fragment>
        <Container className={classes.container}>
          <Grid container spacing={3}>
            <ProfileDataDisplay
              gridSize={6}
              title="Store Name"
              content={booking.store.name}
            />
            <ProfileDataDisplay
              gridSize={6}
              title="Date Queued"
              content={booking.getTimeQueued()}
            />
            <ProfileDataDisplay
              gridSize={4}
              title="Queued For Date"
              content={booking.date}
              edit={this.state.edit}
              setEdit={this.setEdit}
              name="date"
              label="Date"
              value={this.state.date}
              handleFormField={this.handleFormField}
            />
            <ProfileDataDisplay
              gridSize={4}
              title="Shop Time (min)"
              content={booking.shopTime}
              edit={this.state.edit}
              setEdit={this.setEdit}
              name="shopTime"
              label="Shop Time (min)"
              value={this.state.shopTime}
              handleFormField={this.handleFormField}
            />
            <ProfileDataDisplay
              gridSize={4}
              title="Number of Customers"
              content={booking.numCustomer}
              edit={this.state.edit}
              setEdit={this.setEdit}
              name="numCustomer"
              label="Number of Customers"
              value={this.state.numCustomer}
              handleFormField={this.handleFormField}
            />
          </Grid>
          <br/>

          <ProfileEditButtons
            edit={this.state.edit}
            setEdit={this.setEdit}
            handleSave={this.handleSave}
          />
        </Container>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(BookingDetails);
