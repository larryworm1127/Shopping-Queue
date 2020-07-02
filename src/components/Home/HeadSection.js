import React from 'react';
import { Box, Button, Card, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import store from 'store';


class HeadSection extends React.Component {

  getText = () => {
    return (store.get('loggedIn')) ? {
      mainText: 'Welcome ' + store.get('user'),
      buttonText: 'Your Profile',
      subText: '',
      buttonUrl: (store.get('loginAs') === 0 ? '/profile' : 
                 (store.get('loginAs') === 1 ? '/owner-profile' : 
                 '/admin-profile'))
    } : {
      mainText: 'Shopping Queue Manager',
      buttonText: 'Signup',
      subText: 'Now you don\'t need to risk your health for shopping',
      buttonUrl: '/register'
    };
  };

  render() {
    const { classes } = this.props;
    const headerTexts = this.getText();

    return (
      <React.Fragment>
        <div className={classes.wrapper}>
          <Box display="flex" justifyContent="center" className="row">
            <Card
              className={classes.card}
              data-aos-delay="200"
              data-aos="zoom-in"
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
};

export default HeadSection;
