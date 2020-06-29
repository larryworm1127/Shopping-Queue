import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import AccountDetail from './AccountDetail';
import withStyles from '@material-ui/core/styles/withStyles';
import NavBar from '../../Nav/navbar';
import Link from '@material-ui/core/Link';
import ShopperProfile from './ShopperProfile';
import OwnerProfile from './OwnerProfile';
import { withRouter } from 'react-router-dom';
import { styles } from './style';
import { uid } from 'react-uid';
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
    const { classes } = this.props;

    switch (step) {
      case 0:
        return (
          <AccountDetail
            classes={classes}
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
            classes={classes}
            handleNext={this.handleNext}
            handleBack={this.handleBack}
            activeStep={this.state.activeStep}
            handleFormField={this.handleFormField}
          /> :
          <OwnerProfile
            classes={classes}
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
