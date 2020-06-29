import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import withStyles from '@material-ui/core/styles/withStyles';
import NavBar from '../../Nav/navbar';
import { styles } from './style';
import { Redirect, withRouter } from 'react-router-dom';
import LoginForm from './LoginForm';


class Login extends React.Component {

  render() {
    const {
      classes,
      location,
      loggedIn,
      loginUser
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
