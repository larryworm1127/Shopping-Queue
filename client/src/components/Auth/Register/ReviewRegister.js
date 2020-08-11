import React from 'react';
import { register } from '../../../actions/auth';
import RegisterFormButtons from './RegisterFormButtons';
import { Typography, withStyles } from '@material-ui/core';
import { styles } from './style';
import Button from '@material-ui/core/Button';


class ReviewRegister extends React.Component {

  state = {
    errorMessage: '',
    showLoginButton: false
  };

  render() {
    const { classes, registerComp, activeStep, handleBack, history } = this.props;
    const { showLoginButton, errorMessage } = this.state;

    return (
      <React.Fragment>
        <h2>Confirm registration information from previous steps before clicking next!</h2>

        {(errorMessage) && (
          <Typography color="textSecondary" component="p">
            {errorMessage}
          </Typography>
        )}

        {showLoginButton ? (
            <div className={classes.buttons}>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={() => history.push('/login')}
              >
                Go to Login
              </Button>
            </div>
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

export default withStyles(styles)(ReviewRegister);
