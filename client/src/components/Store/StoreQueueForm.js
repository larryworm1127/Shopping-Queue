import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { styles } from './style';
import { withStyles } from '@material-ui/core';
import { addQueue } from '../../actions/queue';
import FormTextField from '../Util/FormTextField';


class StoreQueueForm extends React.Component {

  state = {
    shoppingTime: 1,
    numCustomer: 1,
    date: new Date().toISOString().substring(0, new Date().toISOString().length - 8),
    displayError: false,
    errorMessage: ''
  };

  handleFormSubmit = (event, selectedStore) => {
    event.preventDefault();

    const { history, currentUser } = this.props;
    const newQueue = {
      username: currentUser,
      store: selectedStore.username,
      datetime: this.state.date,
      shopTime: this.state.shoppingTime,
      numCustomers: this.state.numCustomer,
      datetimeQueued: new Date().toISOString(),
    };
    addQueue(newQueue, history, this);
  };

  render() {
    const { classes, store } = this.props;
    const { date, displayError, errorMessage, shoppingTime, numCustomer } = this.state;
    return (
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormTextField
              name="date"
              label="Date"
              type="datetime-local"
              displayError={displayError}
              value={date}
              comp={this}
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              name="shoppingTime"
              label="Estimated Shopping Time (min)"
              type="number"
              displayError={displayError}
              value={shoppingTime}
              comp={this}
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              name="numCustomer"
              label="Number of Shopper"
              type="number"
              displayError={displayError}
              errorMessage={errorMessage}
              value={numCustomer}
              comp={this}
            />
          </Grid>
        </Grid>
        <br/>

        <div className={classes.buttons}>
          <Button
            type='submit'
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={(event) => this.handleFormSubmit(event, store)}
            href='/queue'
          >
            Add to queue
          </Button>
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(StoreQueueForm);
