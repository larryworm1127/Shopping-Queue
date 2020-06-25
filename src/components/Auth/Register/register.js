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
import { Redirect } from 'react-router-dom';
import { styles } from './style';


const steps = ['Account Details', 'Profile Details'];

class Register extends React.Component {
  state = {
    activeStep: 0,
    setActiveStep: 0,
    // account info states
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    registerFor: 1,
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
    shoppingTimeLimit: ''
  };

  handleFormField = (field, event) => {
    this.setState({
      [field]: event.target.value
    });
  };

  getStepContent = (step) => {
    const { classes } = this.props;

    switch (step) {
      case 0:
        return (
          <AccountDetail
            handleFormField={this.handleFormField}
            registerFor={this.state.registerFor}
            classes={classes}
          />
        );
      case 1:
        switch (this.state.registerFor) {
          case 1:
            return <ShopperProfile handleFormField={this.handleFormField}/>;
          case 2:
            return <OwnerProfile handleFormField={this.handleFormField}/>;
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

        <form className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Register
            </Typography>
            <Stepper activeStep={this.state.activeStep} className={classes.stepper}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {this.getStepContent(this.state.activeStep)}

            <div className={classes.buttons}>
              {this.state.activeStep !== 0 && (
                <Button onClick={this.handleBack} className={classes.button}>
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleNext}
                className={classes.button}
              >
                {this.state.activeStep === steps.length - 1 ? 'Register' : 'Next'}
              </Button>
            </div>
          </Paper>

          <Link href="/login" variant="body2">
            Already have an account? Sign in
          </Link>
        </form>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Register);
