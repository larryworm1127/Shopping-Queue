import React from 'react';
import { Typography, withStyles } from '@material-ui/core';
import { styles } from './style';


class AboutUsFooter extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Typography variant="h3" paragraph className={classes.bigFont}>
          About Us
        </Typography>
        <Typography className={classes.paragraph} paragraph>
          We are a group of 4 students with an aim towards helping users during this pandemic.
          <br/>We hope that you find this Web app helpful!
        </Typography>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AboutUsFooter);
