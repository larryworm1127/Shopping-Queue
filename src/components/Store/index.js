import React from 'react';
import { withRouter } from 'react-router-dom';
import NavBar from '../Nav/navbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { getStore } from '../../utils/stores';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import { styles } from './style';
import Grid from '@material-ui/core/Grid';
import StoreDetailList from './StoreDetailList';
import StoreQueueForm from './StoreQueueForm';
import store from 'store';
import { addBooking, Queue } from '../../utils/queue';

class StoreDetail extends React.Component {

  state = {
    date: new Date().toISOString().slice(0, 10),
    est: 30,
    num_of_shoppers: 1,
  };

  handleFormField = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };


  handleFormSubmit() {
    const newQueue = new Queue(
      'user;',  /*default username for now*/
      store,
      this.state.date,
      this.state.est,
      this.state.num_of_shoppers,
      new Date()
    );
    addBooking(newQueue);
  };

  render() {
    const {
      match,
      classes,
      date,
      shoppingTime,
      numCustomer,
      handleFormField
    } = this.props;
    const store = getStore(match.params.id);

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
              <Grid item xs={7}>
                <Typography variant="h6" gutterBottom>
                  Store details
                </Typography>
                <StoreDetailList store={store}/>
              </Grid>
              <Grid item xs={5}>
                <Typography variant="h6" gutterBottom>
                  Queue at store:
                </Typography>

                <StoreQueueForm
                  classes={classes}
                  store={store}
                  date={(date === undefined) ? this.state.date : date}
                  shoppingTime={(shoppingTime === undefined) ? this.state.shoppingTime : shoppingTime}
                  numCustomer={(numCustomer === undefined) ? this.state.numCustomer : numCustomer}
                  handleFormSubmit={this.handleFormSubmit()}
                  handleFormField={(handleFormField === undefined) ? this.handleFormField : handleFormField}
                />
              </Grid>
            </Grid>
          </Paper>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(StoreDetail));
