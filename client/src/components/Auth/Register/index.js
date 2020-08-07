// React imports
import React from 'react';
import { uid } from 'react-uid';
import { withRouter } from 'react-router-dom';
// Material UI imports
import { CssBaseline, Link, Paper, Step, StepLabel, Stepper, Typography, withStyles } from '@material-ui/core';
// User JS imports
import AccountDetail from './AccountDetail';
import NavBar from '../../Nav/navbar';
import ShopperProfile from './ShopperProfile';
import OwnerProfile from './OwnerProfile';
import { styles } from './style';
import ReviewRegister from './ReviewRegister';
import { addNewUser } from '../../../utils/verifyAuth';
import { addShopper } from '../../../utils/shoppers';
import { addStore } from '../../../utils/stores';


const steps = ['Account Details', 'Profile Details', 'Review'];

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.props.history.push('/register')
  }

  state = {
    activeStep: 0,
    // account info states
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    registerAs: 0,
    // shopper profile states
    firstName: '',
    lastName: '',
    address: '',
    remindTime: '',
    // shop owner profile states
    storeName: '',
    location: '',
    customerLimit: '',
    openTime: '07:30',
    closeTime: '07:30',
    shoppingTimeLimit: '',
    storeType: '',
    // error reporting states
    displayError: false,
    errorMessage: ''
  };

  handleFormField = (field, event) => {
    this.setState({
      [field]: event.target.value,
      displayError: false,
      errorMessage: ''
    });
  };

  setError = (message) => {
    this.setState({
      displayError: true,
      errorMessage: message
    });
  };

  handleRegister = (event) => {
    event.preventDefault();

    addNewUser(this.state.username, this.state.password, this.state.registerAs);
    if (this.state.registerAs === 0) {
      addShopper(
        this.state.username,
        this.state.firstName,
        this.state.lastName,
        this.state.address,
        this.state.email,
        this.state.remindTime
      );
    } else {
      addStore(
        this.state.storeName,
        this.state.username,
        this.state.location,
        this.state.email,
        // Use external data in phase 2 to get accurate coordinate based on location
        [43, 66],
        this.state.storeType,
        this.state.openTime,
        this.state.closeTime,
        this.state.customerLimit,
        this.state.shoppingTimeLimit
      );
    }

    const { history } = this.props;
    history.push('/login');
  };

  getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <AccountDetail
            handleNext={this.handleNext}
            handleBack={this.handleBack}
            handleFormField={this.handleFormField}
            setError={this.setError}
            {...this.state}
          />
        );
      case 1:
        return (this.state.registerAs === 0) ?
          <ShopperProfile
            handleNext={this.handleNext}
            handleBack={this.handleBack}
            handleFormField={this.handleFormField}
            {...this.state}
          /> :
          <OwnerProfile
            handleNext={this.handleNext}
            handleBack={this.handleBack}
            handleFormField={this.handleFormField}
            {...this.state}
          />;
      case 2:
        return <ReviewRegister {...this.state} handleRegister={this.handleRegister}/>;
      default:
        return Error('Unknown step');
    }
  };

  handleNext = () => {
    this.setState(previousState => {
      return {
        activeStep: previousState.activeStep + 1
      };
    });
  };

  handleBack = () => {
    this.setState(previousState => {
      return {
        activeStep: previousState.activeStep - 1
      };
    });
  };

  render() {
    const { classes, location } = this.props;

    return (
      <React.Fragment>
        <CssBaseline/>
        <NavBar currentPath={location.pathname}/>

        <div className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Register
            </Typography>
            <Stepper activeStep={this.state.activeStep} className={classes.stepper}>
              {steps.map((label) => (
                <Step key={uid(label)}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {this.getStepContent(this.state.activeStep)}
          </Paper>

          <Link href="/login" variant="body2">
            Already have an account? Sign in
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(Register));
