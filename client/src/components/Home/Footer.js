import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Grid, TextField, Typography, withStyles } from '@material-ui/core';
import { styles } from './style';
import { addHelpMessage } from '../../actions/admin';


class Footer extends React.Component {

  state = {
    title: '',
    description: '',
    visible: false,
    sent: false
  };

  handleFormField = (field, event) => {
    this.setState({
      [field]: event.target.value,
    });
  };

  handleFormSubmit = (username, userType) => {
    const data = {
      username: username,
      userType: userType,
      title: this.state.title,
      description: this.state.description,
      date: new Date()
    };
    addHelpMessage(this, data);
    this.setState({
      visible: true
    });
  };

  render() {
    const { classes, currentUser, userType } = this.props;

    return (
      <div className={classes.footerWrapper}>
        <div className={classes.footerInner}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6} lg={1} />
            <Grid item xs={12} md={6} lg={4}>
              <form>
                <Typography variant="h3" paragraph className={classes.bigFont}>
                  Contact Admin
                </Typography>
                <Box display="flex" flexDirection="column">
                  <Box mb={1}>
                    <TextField
                      variant="outlined"
                      multiline
                      placeholder="Question"
                      rows={1}
                      className={classes.inputField}
                      fullWidth
                      required
                      onChange={(event) => this.handleFormField('title', event)}
                    />
                    <TextField
                      variant="outlined"
                      multiline
                      placeholder="Description"
                      rows={3}
                      className={classes.inputField}
                      fullWidth
                      required
                      onChange={(event) => this.handleFormField('description', event)}
                    />
                  </Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    className={classes.button}
                    onClick={() => this.handleFormSubmit(currentUser, userType)}
                  >
                    Submit
                  </Button>
                </Box>
                {this.state.visible && (this.state.sent ?
                  <p className={classes.messageGood}>Message has been sent!</p> :
                  <p className={classes.messageBad}>An error occurred. Message was not sent.</p>)}
              </form>
            </Grid>

            <Grid item xs={12} md={6} lg={2} />

            <Grid item xs={12} md={6} lg={4}>
              <Typography variant="h3" paragraph className={classes.bigFont}>
                About Us
              </Typography>
              <Typography className={classes.paragraph} paragraph>
                We are a group of 4 students with an aim towards helping users during this pandemic.
                <br />We hope that you find this Web app helpful!
              </Typography>

            </Grid>
            <Grid item xs={12} md={6} lg={1} />
          </Grid>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
