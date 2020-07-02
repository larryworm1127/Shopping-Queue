import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import StoreCards from '../StoreCards';
import { styles } from './style';
import { withStyles } from '@material-ui/core';
import FormTextField from '../FormTextField';
import Button from '@material-ui/core/Button';
import { uid } from 'react-uid';


class UserProfileEdit extends React.Component {

  constructor(props) {
    super(props);
    const { shopper } = this.props;
    this.state = {
      firstName: shopper.firstName,
      lastName: shopper.lastName,
      email: shopper.email,
      address: shopper.address,
      favoriteStores: shopper.favoriteStores,
      remindTime: shopper.remindTime
    };
  }

  handleFormField = (field, event) => {
    this.setState({
      [field]: event.target.value,
    });
  };

  handleRemoveFavStore = (event, index) => {
    event.preventDefault();

    const newFavoriteStores = [...this.state.favoriteStores];
    newFavoriteStores.splice(index, 1);
    this.setState({
      favoriteStores: newFavoriteStores
    });
  };

  handleSave = (event) => {
    event.preventDefault();

    const { setEdit, shopper } = this.props;
    setEdit(false);
    shopper.updateUserProfile(
      this.state.firstName,
      this.state.lastName,
      this.state.address,
      this.state.email,
      this.state.remindTime,
      this.state.favoriteStores
    );
  };

  render() {
    const { classes, setEdit } = this.props;

    return (
      <React.Fragment>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Paper className={classes.paper}>
                <Typography component="h2" variant="h5" color="primary" gutterBottom>
                  Your First Name
                </Typography>
                <FormTextField
                  variant="outlined"
                  margin="normal"
                  name="firstName"
                  label="First Name"
                  value={this.state.firstName}
                  handleFormField={this.handleFormField}
                />
              </Paper>
            </Grid>

            <Grid item xs={3}>
              <Paper className={classes.paper}>
                <Typography component="h2" variant="h5" color="primary" gutterBottom>
                  Your Last Name
                </Typography>
                <FormTextField
                  variant="outlined"
                  margin="normal"
                  name="lastName"
                  label="Last Name"
                  value={this.state.lastName}
                  handleFormField={this.handleFormField}
                />
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography component="h2" variant="h5" color="primary" gutterBottom>
                  Your Email
                </Typography>
                <FormTextField
                  variant="outlined"
                  margin="normal"
                  name="email"
                  label="Email"
                  value={this.state.email}
                  handleFormField={this.handleFormField}
                />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography component="h2" variant="h5" color="primary" gutterBottom>
                  Your Location
                </Typography>
                <FormTextField
                  variant="outlined"
                  margin="normal"
                  name="address"
                  label="Address"
                  value={this.state.address}
                  handleFormField={this.handleFormField}
                />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography component="h2" variant="h5" color="primary" gutterBottom>
                  Your Favourite Stores:
                </Typography>
                <Grid container spacing={3}>
                  {this.state.favoriteStores.map((store, index) => (
                    <Grid item md={4} key={uid(index)}>
                      <StoreCards
                        store={store}
                        index={index}
                        disableQueue={true}
                        secondButton={
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={event => {
                              this.handleRemoveFavStore(event, index);
                            }}
                          >
                            Remove
                          </Button>
                        }
                      />
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography component="h2" variant="h5" color="primary" gutterBottom>
                  Notification Settings:
                </Typography>
                <FormTextField
                  variant="outlined"
                  margin="normal"
                  name="remindTime"
                  label="Minutes before my booking to remind me."
                  value={this.state.remindTime}
                  handleFormField={this.handleFormField}
                />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Button
                className={classes.bottomButton}
                variant="contained"
                color="primary"
                onClick={this.handleSave}
              >
                Save
              </Button>

              <Button
                className={classes.bottomButton}
                variant="contained"
                color="primary"
                onClick={() => {setEdit(false)}}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(UserProfileEdit);
