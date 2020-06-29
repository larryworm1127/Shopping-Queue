import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Typography, withStyles } from '@material-ui/core';
import { styles } from './style';


function Iconcard(props) {
  const { classes, Icon, color, headline, text } = props;
  return (
    <Fragment>
      <div
        // We will set color and fill here, due to some prios complications
        className={classes.iconWrapper}
        style={{
          color: color,
          backgroundColor: 0x0000ff,
          fill: color,
          align: 'center'
        }}
      >
        {Icon}

        <Typography variant="h5" paragraph align="center">
          {headline}
        </Typography>
        <Typography variant="body1" color="textSecondary" align="center">
          {text}
        </Typography>
      </div>
    </Fragment>
  );
}

Iconcard.propTypes = {
  classes: PropTypes.object.isRequired,
  Icon: PropTypes.element.isRequired,
  color: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(Iconcard);
