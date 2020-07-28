import React from 'react';
import PropTypes from 'prop-types';
import { Typography, withStyles } from '@material-ui/core';
import { styles } from './style';
import Link from '@material-ui/core/Link';


class IconCard extends React.Component {

  render() {
    const { classes, Icon, headline, text, link } = this.props;

    return (
      <React.Fragment>
        <div className={classes.iconWrapper}>
          {Icon}
          <Typography variant="h5" paragraph align="center">
            {(link === undefined) ? headline :
              <Link href={link}>
                {headline}
              </Link>
            }
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
  text: PropTypes.string.isRequired,
  link: PropTypes.string
};

export default withStyles(styles)(IconCard);
