import React from 'react';
import { withRouter } from 'react-router-dom';
import NavBar from '../Nav/navbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { stores } from '../../utils/stores';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import { styles } from './style';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


class StoreDetail extends React.Component {

  state = {
    date: '',
    shoppingTime: '',
    customerLimit: ''
  };

  handleFormField = (field, event) => {
    this.setState({
      [field]: event.target.value,
    });
  };

  render() {
    const { match, classes } = this.props;
    const store = stores[match.params.id];
    const today = new Date().toISOString().slice(0, 10);

    return (
      <React.Fragment>
        <NavBar/>
        <CssBaseline/>

        <div className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              {store.name}
            </Typography>
            <br/>

            <Grid container>
              <Grid item xs={6}>
                <Typography variant="h6" gutterBottom>
                  Store details
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" gutterBottom>
                  Book at store:
                </Typography>

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
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="numCustomer"
                        label="Number of Shopper"
                        type="number"
                        min={0}
                        max={store.customerLimit}
                      />
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Paper>
        </div>

      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(StoreDetail));
