import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { styles } from './style';
import { withStyles } from '@material-ui/core';


class StoreQueueForm extends React.Component {

  render() {
    const {
      classes,
      store,
      shoppingTime,
      numCustomer,
      handleFormSubmit,
      handleFormField,
    } = this.props;

    return (
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              name="date"
              label="Date"
              type="datetime-local"
              defaultValue="2020-08-18T10:30"
              onChange={(event) => handleFormField('date', event)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="shoppingTime"
              label="Estimated Shopping Time (min)"
              type="number"
              inputProps={{ min: 1, max: store.customerShopTime }}
              value={shoppingTime}
              onChange={(event) => handleFormField('shoppingTime', event)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="numCustomer"
              label="Number of Shopper"
              type="number"
              inputProps={{ min: 1, max: store.customerLimit }}
              value={numCustomer}
              onChange={(event) => handleFormField('numCustomer', event)}
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
            onClick={(event) => handleFormSubmit(event, store)}
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
