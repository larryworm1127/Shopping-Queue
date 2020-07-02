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
import FinishRegister from './FinishRegister';


const steps = ['Account Details', 'Profile Details', 'Success'];

class Register extends React.Component {
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
    // shop owner profile states
    storeName: '',
    location: '',
    customerLimit: '',
    openTime: '',
    closeTime: '',
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

  getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <AccountDetail
            handleNext={this.handleNext}
            handleBack={this.handleBack}
            activeStep={this.state.activeStep}
            handleFormField={this.handleFormField}
            username={this.state.username}
            email={this.state.email}
            password={this.state.password}
            confirmPassword={this.state.confirmPassword}
            registerAs={this.state.registerAs}
            displayError={this.state.displayError}
            errorMessage={this.state.errorMessage}
            setError={this.setError}
          />
        );
      case 1:
        return (this.state.registerAs === 0) ?
          <ShopperProfile
            handleNext={this.handleNext}
            handleBack={this.handleBack}
            activeStep={this.state.activeStep}
            handleFormField={this.handleFormField}
          /> :
          <OwnerProfile
            handleNext={this.handleNext}
            handleBack={this.handleBack}
            activeStep={this.state.activeStep}
            storeType={this.state.storeType}
            handleFormField={this.handleFormField}
          />;
      case 2:
        return <FinishRegister/>;
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
