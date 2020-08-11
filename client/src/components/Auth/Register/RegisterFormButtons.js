import React from 'react';
import Button from '@material-ui/core/Button';
import { styles } from './style';
import { withStyles } from '@material-ui/core';


class RegisterFormButtons extends React.Component {

  render() {
    const { activeStep, classes, handleBack, onClick } = this.props;

    return (
      <React.Fragment>
        <div className={classes.buttons}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} className={classes.button}>
              Back
            </Button>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={onClick}
          >
            Next
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(RegisterFormButtons);
