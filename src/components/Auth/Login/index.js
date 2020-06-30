// React imports
import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
// Material UI imports
import { Avatar, Container, CssBaseline, Grid, Link, Typography, withStyles } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// User JS imports
import NavBar from '../../Nav/navbar';
import { styles } from './style';
import LoginForm from './LoginForm';
import store from 'store';

class Login extends React.Component {

  render() {
    const {
      classes,
      location,
      loggedIn,
      loginUser
    } = this.props;

    return !!store.get('loggedIn') ? (<Redirect to={{ pathname: '/profile' }} />) : (
      <React.Fragment>
        <NavBar currentPath={location.pathname} />

        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <LoginForm
              classes={classes}
              loginUser={loginUser}
            />

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
