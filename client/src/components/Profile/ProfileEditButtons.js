import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';


const styles = theme => ({
  bottomButton: {
    marginRight: theme.spacing(2)
  }
})


class ProfileEditButtons extends React.Component {

  render() {
    const { classes, edit, setEdit, handleSave } = this.props;

    return (
      <React.Fragment>
        {edit && (
          <Grid item xs={12}>
            <Button
              className={classes.bottomButton}
              variant="contained"
              color="primary"
              onClick={handleSave}
            >
              Save
            </Button>

            <Button
              className={classes.bottomButton}
              variant="contained"
              color="primary"
              onClick={() => {
                setEdit(false);
              }}
            >
              Cancel
            </Button>
          </Grid>
        )}
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(ProfileEditButtons);
