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


class Login extends React.Component {

  constructor(props) {
    super(props);
    this.props.history.push('/login');
  }

  render() {
    const { classes, location, userType, isLoggedIn, app } = this.props;

    return (isLoggedIn) ? (<Redirect to={{ pathname: '/' }}/>) : (
      <React.Fragment>
        <NavBar currentPath={location.pathname} userType={userType} isLoggedIn={isLoggedIn}/>

        <Container component="main" maxWidth="xs">
          <CssBaseline/>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon/>
            </Avatar>

            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <LoginForm app={app}/>

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
