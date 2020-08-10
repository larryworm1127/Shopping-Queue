import React from 'react';
import Button from '@material-ui/core/Button';


class RegisterFormButtons extends React.Component {

  handleFormField = (field, event) => {
    this.setState({
      [field]: event.target.value,
      displayError: false,
      errorMessage: ''
    });
  };

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

export default RegisterFormButtons;
