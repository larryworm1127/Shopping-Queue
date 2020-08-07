import React from 'react';
import Button from '@material-ui/core/Button';
import { register } from '../../../actions/auth';


class ReviewRegister extends React.Component {

  render() {
    const { registerComp } = this.props;

    return (
      <React.Fragment>
        <h2>Confirm registration information from previous steps before clicking register!</h2>
        <Button
          variant="contained"
          color="primary"
          onClick={() => register(registerComp)}
        >
          Register
        </Button>
      </React.Fragment>
    );
  }
}

export default ReviewRegister;
