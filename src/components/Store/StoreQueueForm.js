import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Queue } from '../../utils/stores';


class StoreQueueForm extends React.Component {

  state = {
    date: new Date().toISOString().slice(0, 10),
    shoppingTime: 30,
    numCustomer: 1
  };

  handleFormField = (field, event) => {
    this.setState({
      [field]: event.target.value,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { store } = this.props;
    const newQueue = new Queue('test', this.state.date, this.state.shoppingTime, this.state.numCustomer);
    store.queue.push(newQueue);
  };

  render() {
    const { classes, store } = this.props;
    const today = new Date().toISOString().slice(0, 10);

    return (
      <form onSubmit={this.handleFormSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="date"
              label="Date"
              type="date"
              value={this.state.date}
              onChange={(event) => {
                this.handleFormField('date', event);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="shoppingTime"
              label="Estimated Shopping Time (min)"
              type="number"
              max={store.customerShopTime}
              value={this.state.shoppingTime}
              onChange={(event) => {
                this.handleFormField('shoppingTime', event);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="numCustomer"
              label="Number of Shopper"
              type="number"
              max={store.customerLimit}
              value={this.state.numCustomer}
              onChange={(event) => {
                this.handleFormField('numCustomer', event);
              }}
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
          >
            Queue now
          </Button>
          <Button
            type='submit'
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Queue ahead
          </Button>
        </div>
      </form>
    );
  }
}

export default StoreQueueForm;
