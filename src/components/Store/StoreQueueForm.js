import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class StoreQueueForm extends React.Component {

  state = {
    date: '',
    shoppingTime: '',
    numCustomer: ''
  };

  handleFormField = (field, event) => {
    this.setState({
      [field]: event.target.value,
    });
  };

  render() {
    const { classes, store } = this.props;
    const today = new Date().toISOString().slice(0, 10);

    return (
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="date"
              label="Date"
              type="date"
              defaultValue={today}
              min={today}
              onChange={(event) => {
                this.handleFormField("date", event);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="shoppingTime"
              label="Estimated Shopping Time (min)"
              type="number"
              min={0}
              max={store.customerShopTime}
              onChange={(event) => {
                this.handleFormField("shoppingTime", event);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="numCustomer"
              label="Number of Shopper"
              type="number"
              min={0}
              max={store.customerLimit}
              onChange={(event) => {
                this.handleFormField("numCustomer", event);
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
