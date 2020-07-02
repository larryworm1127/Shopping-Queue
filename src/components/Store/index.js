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
import { Queue } from '../../utils/queue';
import { getShopper } from '../../utils/shoppers';


class StoreDetail extends React.Component {

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

  handleFormSubmit = (event, selectedStore) => {
    event.preventDefault();
    const newQueue = new Queue(
      store.get('user'),
      this.state.date,
      this.state.shoppingTime,
      this.state.numCustomer,
      new Date()
    );
    selectedStore.addNewQueue(newQueue);
    getShopper(store.get('user')).queueUp(newQueue);
  };

  render() {
    const {
      match,
      classes,
      date,
      shoppingTime,
      numCustomer,
      handleFormSubmit,
      handleFormField
    } = this.props;
    const store = getStore(match.params.id);
    console.log(store)

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
                  handleFormSubmit={(handleFormSubmit === undefined) ? this.handleFormSubmit : handleFormSubmit}
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
