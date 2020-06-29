import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import withStyles from '@material-ui/core/styles/withStyles';
import NavBar from '../../Nav/navbar';
import { styles } from './style';
import { loginVerify } from '../../../utils/verifyAuth';
import { Redirect, withRouter } from 'react-router-dom';
import FormTextField from '../formTextField';
import FormSelectField from '../formSelectField';


class Login extends React.Component {

  state = {
    username: '',
    password: '',
    loginAs: 0,
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

  handleLoginSubmit = (event) => {
    const { loginUser } = this.props;

    event.preventDefault();
    const verify = loginVerify(this.state.username, this.state.password, this.state.loginAs);
    if (verify === true) {
      loginUser();
    } else {
      this.setState({
        displayError: true,
        errorMessage: verify
      });
    }
  };

  render() {
    const {
      classes,
      location,
      loggedIn,
    } = this.props;

    return loggedIn ? (<Redirect to={{ pathname: '/' }}/>) : (
      <React.Fragment>
        <NavBar currentPath={location.pathname}/>

        <Container component="main" maxWidth="xs">
          <CssBaseline/>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon/>
            </Avatar>

            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <form className={classes.form} onSubmit={this.handleLoginSubmit}>
              <FormTextField
                variant="outlined"
                margin="normal"
                name="username"
                label="Username"
                displayError={this.state.displayError}
                handleFormField={this.handleFormField}
              />
              <FormTextField
                variant="outlined"
                margin="normal"
                name="password"
                label="Password"
                type="password"
                errorMessage={this.state.errorMessage}
                displayError={this.state.displayError}
                handleFormField={this.handleFormField}
              />

              <FormSelectField
                name="loginAs"
                label="Login As"
                variant="outlined"
                formControlLabelClass={classes.formControlLabel}
                formControlClass={classes.formControl}
                value={this.state.loginAs}
                handleFormField={this.handleFormField}
                menuItems={['Shopper', 'Shop Owner', 'Admin']}
              />

              <FormControlLabel
                control={<Checkbox value="remember" color="primary"/>}
                label="Remember me"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
            </form>

            <Grid container>
              <Grid item xs>
                {/* implement password recovery in phase 2 */}
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {'Don\'t have an account? Sign Up'}
                </Link>
              </Grid>
            </Grid>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(Login));
