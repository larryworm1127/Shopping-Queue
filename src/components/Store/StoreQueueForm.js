import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class StoreQueueForm extends React.Component {

  render() {
    const {
      classes,
      store,
      date,
      shoppingTime,
      numCustomer,
      handleFormSubmit,
      handleFormField
    } = this.props;
/*onSubmit={(event) => {handleFormSubmit(event, store)}}*/
    return (
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="date"
              label="Date"
              type="date"
              value={date}
             /* onChange={(event) => {
                handleFormField('date', event);
              }}
              */
              onChange={handleFormField}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="est"
              label="Estimated Shopping Time (min)"
              type="number"
              max={store.customerShopTime}
              value={shoppingTime}
             /* onChange={(event) => {
                handleFormField('shoppingTime', event);
              }}
              */
              onChange={handleFormField}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="num_of_shoppers"
              label="Number of Shopper"
              type="number"
              max={store.customerLimit}
              value={numCustomer}
              /*onChange={(event) => {
                handleFormField('numCustomer', event);
              }}*/
              onChange={handleFormField}
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
            onClick={handleFormSubmit}
            href='/queue'
          >
            Add to queue
          </Button>
        </div>
      </form>
    );
  }
}

export default StoreQueueForm;
