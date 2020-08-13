import React from 'react';
import { withRouter } from 'react-router-dom';
import NavBar from '../Nav/navbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import { styles } from './style';
import Grid from '@material-ui/core/Grid';
import StoreDetailList from './StoreDetailList';
import StoreQueueForm from './StoreQueueForm';
import BackArrow from '@material-ui/icons/ArrowBackIos';
import Button from '@material-ui/core/Button';
import { addQueue } from '../../actions/queue';
import { getStoreObj } from '../../actions/store';


class StoreDetail extends React.Component {

  componentDidMount() {
    getStoreObj(this.props.match.params.username, this);
  }

  state = {
    date: new Date().toISOString(),
    shoppingTime: 1,
    numCustomer: 1,
    store: {}
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
      username: currentUser,
      store: selectedStore.username,
      datetime: this.state.date,
      shopTime: this.state.shoppingTime,
      numCustomers: this.state.numCustomer,
      datetimeQueued: new Date().toISOString(),
    };
    addQueue(JSON.stringify(newQueue), history);
  };


  render() {
    const { classes, history, isLoggedIn, userType } = this.props;
    const { store, date, numCustomer, shoppingTime } = this.state;

    return (
      <React.Fragment>
        <NavBar isLoggedIn={isLoggedIn} userType={userType}/>
        <CssBaseline/>

        <div className={classes.layout}>
          <Paper className={classes.paper}>
            <Button
              size="small"
              className={classes.button}
              color="primary"
              onClick={() => history.goBack()}
            >
              <BackArrow/>Back
            </Button>

            <Typography component="h1" variant="h4" align="center">
              {store.storeName}
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
                  store={store}
                  date={date}
                  shoppingTime={shoppingTime}
                  numCustomer={numCustomer}
                  handleFormSubmit={this.handleFormSubmit}
                  handleFormField={this.handleFormField}
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
