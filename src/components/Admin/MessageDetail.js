import React from 'react';
import { styles } from './style';
import { Typography, withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class MessageDetail extends React.Component {

  render() {
    const { classes, message } = this.props;

    return (
      <React.Fragment>
        <Container className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography component="h2" variant="h5" color="primary" gutterBottom>
                  Issue Description
                </Typography>

                <Typography color="textSecondary" className={classes.secondaryText}>
                  {message.description}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography component="h2" variant="h5" color="primary" gutterBottom>
                  Reply
                </Typography>

                <TextField className={classes.replyTextField} label="Reply Message" variant="outlined"/>
                <Button variant="contained" color="secondary">
                  Reply
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(MessageDetail);
