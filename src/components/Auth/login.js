import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import withStyles from '@material-ui/core/styles/withStyles';
import NavBar from '../navbar';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  formControlLabel: {
    textTransform: 'uppercase',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    color: theme.palette.secondary.main
  },
  formControl: {
    width: '100%',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends React.Component {

  state = {
    username: '',
    password: '',
    loginAs: 1
  };

  handleFormField = (field, event) => {
    this.setState({
      [field]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <NavBar currentPath={this.props.location.pathname}/>

        <Container component="main" maxWidth="xs">
          <CssBaseline/>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon/>
            </Avatar>

            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <form className={classes.form}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={(event) => {
                  this.handleFormField('username', event);
                }}
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => {
                  this.handleFormField('password', event);
                }}
              />

              <Typography className={classes.formControlLabel}>
                Login as
              </Typography>

              <FormControl
                variant="outlined"
                className={classes.formControl}
              >
                <Select
                  value={this.state.loginAs}
                  onChange={(event) => {
                    this.handleFormField('loginAs', event);
                  }}
                >
                  <MenuItem value={1}>Shopper</MenuItem>
                  <MenuItem value={2}>Store Owner</MenuItem>
                  <MenuItem value={3}>Admin</MenuItem>
                </Select>
              </FormControl>

              <FormControlLabel
                control={
                  <Checkbox value="remember" color="primary"/>
                }
                label="Remember me"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                href='/'
              >
                Sign In
              </Button>

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
            </form>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Login);
