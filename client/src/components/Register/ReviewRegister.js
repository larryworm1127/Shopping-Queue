import React from 'react';
import { register } from '../../actions/auth';
import RegisterFormButtons from './RegisterFormButtons';
import { Alert, AlertTitle } from '@material-ui/lab';
import Button from '@material-ui/core/Button';


class ReviewRegister extends React.Component {

  state = {
    errorMessage: '',
    showLoginButton: false
  };

  render() {
    const { registerComp, activeStep, handleBack, history } = this.props;
    const { showLoginButton, errorMessage } = this.state;

    return (
      <React.Fragment>
        <h2>Confirm registration information from previous steps before clicking next!</h2>

        {(errorMessage) && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {errorMessage}
          </Alert>
        )}

        {showLoginButton ? (
            <Alert severity="success">
              <AlertTitle>Register success!</AlertTitle>
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push('/login')}
              >
                Go to Login
              </Button>
            </Alert>
          )
          : (
            <RegisterFormButtons
              activeStep={activeStep}
              handleBack={handleBack}
              onClick={() => register(registerComp, this)}
            />
          )
        }
      </React.Fragment>
    );
  }
}

export default ReviewRegister;
