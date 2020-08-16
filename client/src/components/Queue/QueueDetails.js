import React from 'react';
import { styles } from './style';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import DataDisplay from '../Util/DataDisplay';
import ProfileEditButtons from '../Profile/ProfileEditButtons';
import { updateQueue } from '../../actions/queue';


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

  handleSave = (event) => {
    event.preventDefault();

    const { queue } = this.props;
    updateQueue(queue._id, this);
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
              title="Arrive At"
              content={new Date(this.state.datetime).toLocaleString()}
              edit={this.state.edit}
              setEdit={this.setEdit}
              name="datetime"
              label="Datetime"
              type="datetime-local"
              value={this.state.datetime}
              comp={this}
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
              comp={this}
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
              comp={this}
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
