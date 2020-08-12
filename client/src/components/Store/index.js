import React from 'react';
import { withRouter } from 'react-router-dom';
import NavBar from '../Nav/navbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { getStore, getStoreByUsername } from '../../utils/stores';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import { styles } from './style';
import Grid from '@material-ui/core/Grid';
import StoreDetailList from './StoreDetailList';
import StoreQueueForm from './StoreQueueForm';
import { Queue } from '../../utils/queue';
import { getShopper } from '../../utils/shoppers';
import BackArrow from '@material-ui/icons/ArrowBackIos';
import Button from '@material-ui/core/Button';
import { addQueue } from '../../actions/queue';

class StoreDetail extends React.Component {

  state = {
    date: new Date().toISOString().slice(0, 10),
    est: 30,
    numShoppers: 1,
  };

  handleFormField = (field, event) => {
    this.setState({
      [field]: event.target.value,
    });
  };

  handleFormSubmit = (event, selectedStore) => {
    event.preventDefault();

    const { history, currentUser } = this.props;
    const newQueue = {
      username: 'user',
      store: selectedStore.username,
      date: this.state.date,
      shopTime: this.state.est,
      numCustomers: this.state.numShoppers,
      dateTimeQueued: new Date().toString()
    };
    console.log(newQueue)
    addQueue(newQueue)
    // selectedStore.addNewQueue(newQueue);
    // getShopper(currentUser).queueUp(newQueue);
    // history.push('/queue');
  };


  render() {
    const { match, classes, date, shoppingTime, numCustomer, handleFormField, history } = this.props;
    const store = getStoreByUsername(match.params.username);

    return (
      <React.Fragment>
        <NavBar />
        <CssBaseline />

        <div className={classes.layout}>
          <Paper className={classes.paper}>
            <Button
              size="small"
              className={classes.button}
              color="primary"
              onClick={() => history.goBack()}
            >
              <BackArrow />Back
            </Button>

            <Typography component="h1" variant="h4" align="center">
              {store.name}
            </Typography>
            <br />
            <Grid container>
              <Grid item xs={7}>
                <Typography variant="h6" gutterBottom>
                  Store details
                </Typography>
                <StoreDetailList store={store} />
              </Grid>
              <Grid item xs={5}>
                <Typography variant="h6" gutterBottom>
                  Queue at store:
                </Typography>

                <StoreQueueForm
                  classes={classes}
                  store={store}
                  date={(date === undefined) ? this.state.date : date}
                  shoppingTime={(shoppingTime === undefined) ? this.state.est : shoppingTime}
                  numCustomer={(numCustomer === undefined) ? this.state.numShoppers : numCustomer}
                  handleFormSubmit={this.handleFormSubmit}
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
