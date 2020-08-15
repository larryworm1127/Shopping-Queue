import React from 'react';
import { Box, Button, TextField, Typography, withStyles } from '@material-ui/core';
import { styles } from './style';
import { handleFormField } from '../../utils/utils';


class ContactAdmin extends React.Component {

  render() {
    const { classes, currentUser, userType, visible, sent, handleFormSubmit, comp } = this.props;

    return (
      <form onSubmit={event => handleFormSubmit(event, currentUser, userType)}>
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
              onChange={(event) => handleFormField.bind(comp)('title', event)}
            />
            <TextField
              variant="outlined"
              multiline
              placeholder="Description"
              rows={3}
              className={classes.inputField}
              fullWidth
              required
              onChange={(event) => handleFormField.bind(comp)('description', event)}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            className={classes.button}
          >
            Submit
          </Button>
        </Box>
        {visible && (sent ?
          <p className={classes.messageGood}>Message has been sent!</p> :
          <p className={classes.messageBad}>An error occurred. Message was not sent.</p>)}
      </form>
    );
  }
}

export default withStyles(styles)(ContactAdmin);
