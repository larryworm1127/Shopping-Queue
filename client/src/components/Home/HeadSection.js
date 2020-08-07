import React from 'react';
import { Box, Button, Card, Typography, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { styles } from './style';


class HeadSection extends React.Component {

  getText = (userType, currentUser) => {
    return (currentUser !== null) ? {
      mainText: `Welcome ${currentUser}`,
      buttonText: 'Your Profile',
      subText: '',
      buttonUrl: (userType === 0 ? '/profile' :
          (userType === 1 ? '/store/profile' : '/admin/profile')
      )
    } : {
      mainText: 'Shopping Queue Manager',
      buttonText: 'Signup',
      subText: 'Now you don\'t need to risk your health for shopping!',
      buttonUrl: '/register'
    };
  };

  render() {
    const { classes, userType, currentUser } = this.props;
    const headerTexts = this.getText(userType, currentUser);

    return (
      <React.Fragment>
        <div className={classes.wrapper}>
          <Box className={classes.services_box}>
            <Card
              className={classes.card}
            >
              <Typography variant={'h3'}>
                {headerTexts.mainText}
              </Typography>
              <Box mb={2}>
                <Typography
                  variant={'h6'}
                  color="textSecondary"
                >
                  {headerTexts.subText}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                className={classes.extraLargeButton}
                href={headerTexts.buttonUrl}
              >
                {headerTexts.buttonText}
              </Button>
            </Card>
          </Box>
        </div>
      </React.Fragment>
    );
  }
}

HeadSection.propTypes = {
  classes: PropTypes.object,
  userType: PropTypes.number,
  currentUser: PropTypes.string
};

export default withStyles(styles)(HeadSection);
