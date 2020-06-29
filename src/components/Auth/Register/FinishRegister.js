import React from 'react'
import Button from '@material-ui/core/Button';


class FinishRegister extends React.Component {

  render() {
    return (
      <React.Fragment>
        <h2>Register Success!</h2>
        <Button
          href='/login'
          variant="contained"
          color="primary"
        >
          Click to Login
        </Button>
      </React.Fragment>
    )
  }
}

export default FinishRegister;
