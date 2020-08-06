import React from 'react';
import { styles } from './style';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import DataDisplay from '../DataDisplay';
import ProfileEditButtons from '../Profile/ProfileEditButtons';


class QueueDetails extends React.Component {

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
            <DataDisplay
              gridSize={6}
              title="Store Name"
              content={booking.store.name}
            />
            <DataDisplay
              gridSize={6}
              title="Date Queued"
              content={booking.getTimeQueued()}
            />
            <DataDisplay
              gridSize={4}
              title="Queued For Date"
              content={booking.date}
              edit={this.state.edit}
              setEdit={this.setEdit}
              name="date"
              label="Date"
              type="date"
              value={this.state.date}
              handleFormField={this.handleFormField}
            />
            <DataDisplay
              gridSize={4}
              title="Shop Time (min)"
              content={booking.shopTime}
              edit={this.state.edit}
              setEdit={this.setEdit}
              name="shopTime"
              label="Shop Time (min)"
              value={this.state.shopTime}
              type="number"
              handleFormField={this.handleFormField}
            />
            <DataDisplay
              gridSize={4}
              title="Number of Customers"
              content={booking.numCustomer}
              edit={this.state.edit}
              setEdit={this.setEdit}
              name="numCustomer"
              label="Number of Customers"
              type="number"
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

export default withStyles(styles)(QueueDetails);
