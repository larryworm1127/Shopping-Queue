import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AccountDetail from './accountDetail';
import withStyles from '@material-ui/core/styles/withStyles';
import NavBar from '../../Nav/navbar';
import Link from '@material-ui/core/Link';
import ShopperProfile from './shopperProfile';
import OwnerProfile from './ownerProfile';
import { Redirect, withRouter } from 'react-router-dom';
import { styles } from './style';
import { registerVerify } from '../../../utils/verifyAuth';
import { uid } from 'react-uid';


const steps = ['Account Details', 'Profile Details'];

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

  handleRegisterForm = (event) => {
    event.preventDefault();
    switch (this.state.activeStep) {
      case 0:
        return this.handleAccountDetail();
      case 1:
        return (this.state.registerAs === 0) ? this.handleShopperProfile() : this.handleOwnerProfile();
      default:
        return Error('Unknown step');
    }
  };

  handleAccountDetail = () => {
    const verify = registerVerify(
      this.state.username,
      this.state.password,
      this.state.confirmPassword,
      this.state.registerAs
    );
    if (verify === true) {
      this.handleNext();
    } else {
      this.setState({
        displayError: true,
        errorMessage: verify
      });
    }
  };

  handleOwnerProfile = () => {
    this.handleNext();
  };

  handleShopperProfile = () => {
    this.handleNext();
  };

  getStepContent = (step) => {
    const { classes } = this.props;

    switch (step) {
      case 0:
        return (
          <AccountDetail
            handleFormField={this.handleFormField}
            registerAs={this.state.registerAs}
            username={this.state.username}
            email={this.state.email}
            password={this.state.password}
            confirmPassword={this.state.confirmPassword}
            classes={classes}
            displayError={this.state.displayError}
            errorMessage={this.state.errorMessage}
          />
        );
      case 1:
        switch (this.state.registerAs) {
          case 1:
            return (
              <ShopperProfile
                handleFormField={this.handleFormField}
              />);
          case 2:
            return (
              <OwnerProfile
                handleFormField={this.handleFormField}
              />);
          default:
            return <Redirect to={{ pathname: '/login' }}/>;
        }
      default:
        return <Redirect to={{ pathname: '/login' }}/>;
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
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline/>
        <NavBar currentPath={this.props.location.pathname}/>

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

            <form onSubmit={this.handleRegisterForm}>
              {this.getStepContent(this.state.activeStep)}

              <div className={classes.buttons}>
                {this.state.activeStep !== 0 && (
                  <Button onClick={this.handleBack} className={classes.button}>
                    Back
                  </Button>
                )}
                <Button
                  type='submit'
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Next
                </Button>
              </div>
            </form>
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
