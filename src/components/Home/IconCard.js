import React from 'react';
import PropTypes from 'prop-types';
import { Typography, withStyles } from '@material-ui/core';
import { styles } from './style';


class IconCard extends React.Component {

  render() {
    const { classes, Icon, headline, text } = this.props;

    return (
      <React.Fragment>
        <div className={classes.iconWrapper}>
          {Icon}
          <Typography variant="h5" paragraph align="center">
            {headline}
          </Typography>
          <Typography variant="body1" color="textSecondary" align="center">
            {text}
          </Typography>
        </div>
      </React.Fragment>
    );
  }
}

IconCard.propTypes = {
  classes: PropTypes.object.isRequired,
  Icon: PropTypes.element.isRequired,
  color: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default withStyles(styles)(IconCard);
