import React from 'react';
import { Typography, withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';


const styles = (theme) => ({
  emptyText: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  }
});


class ContentTitle extends React.Component {

  render() {
    const { isEmpty, classes, name } = this.props;

    return (
      <Container className={classes.emptyText}>
        {(isEmpty) ? (
          <Typography component="h2" variant="h5" color="primary" gutterBottom>
            You have no {name} currently.
          </Typography>
        ) : (
          <Typography component="h2" variant="h5" color="primary" gutterBottom>
            Your {name}
          </Typography>
        )}
      </Container>
    );
  }
}

export default withStyles(styles)(ContentTitle);
