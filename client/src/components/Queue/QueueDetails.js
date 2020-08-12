import React from 'react';
import { styles } from './style';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import DataDisplay from '../DataDisplay';
import ProfileEditButtons from '../Profile/ProfileEditButtons';
import { updateQueue } from '../../actions/queue';
import datetime from 'date-and-time';


class QueueDetails extends React.Component {

  constructor(props) {
    super(props);
    const { queue } = this.props;
    this.state = {
      edit: false,
      datetime: queue.datetime,
      shopTime: queue.shopTime,
      numCustomers: queue.numCustomers
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

    const { queue } = this.props;
    updateQueue(queue._id, this)
  };

  render() {
    const { classes, queue } = this.props;

    return (
      <React.Fragment>
        <Container className={classes.container}>
          <Grid container spacing={3}>
            <DataDisplay
              gridSize={6}
              title="Store Name"
              content={queue.store}
            />
            <DataDisplay
              gridSize={6}
              title="Date Queued"
              content={queue.datetimeQueued}
            />
            <DataDisplay
              gridSize={4}
              title="Queued For Date"
              content={this.state.datetime}
              edit={this.state.edit}
              setEdit={this.setEdit}
              name="datetime"
              label="Datetime"
              type="datetime-local"
              value={datetime.format(new Date(this.state.datetime), 'YYYY-MM-DD[T]hh:mm')}
              handleFormField={this.handleFormField}
            />
            <DataDisplay
              gridSize={4}
              title="Shop Time (min)"
              content={this.state.shopTime}
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
              content={this.state.numCustomers}
              edit={this.state.edit}
              setEdit={this.setEdit}
              name="numCustomer"
              label="Number of Customers"
              type="number"
              value={this.state.numCustomers}
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
