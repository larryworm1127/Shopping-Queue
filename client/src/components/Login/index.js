import React from 'react';
import { withRouter } from 'react-router-dom';
import { Avatar, Container, CssBaseline, Grid, Link, Typography, withStyles } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import NavBar from '../Nav/navbar';
import { styles } from './style';
import LoginForm from './LoginForm';


class Login extends React.Component {

  render() {
    const { classes, userType, isLoggedIn, app } = this.props;

    return (
      <React.Fragment>
        <NavBar userType={userType} isLoggedIn={isLoggedIn}/>

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
