import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Box, Button, Card, Typography, withStyles, withWidth, } from '@material-ui/core';
import { styles } from './style';
import store from 'store'
import parse from 'html-react-parser';


function HeadSection(props) {
  const { classes } = props;
  let main_text = 'Shopping Queue Manager';
  let button_text = 'Signup';
  let sub_text = ' Now you don\'t need to risk your health for shopping';
  let button_url = '/register';

  if (store.get('loggedIn')) {
    main_text = 'Welcome ' + store.get('user');
    button_text = 'Your Profile';
    sub_text = '';
    button_url = '/profile';
  }

  return (
    <Fragment>
      <div className={classNames('main_div', classes.wrapper)}>
        <div className={classNames('container-fluid', classes.container)}>
          <Box display="flex" justifyContent="center" className="row">
            <Card
              className={classes.card}
              data-aos-delay="200"
              data-aos="zoom-in"
            >
              <div className={classNames(classes.containerFix, 'container')}>

                <div>
                  <Typography
                    variant={'h3'}
                  >
                    {parse(main_text)}
                  </Typography>
                </div>
                <div>
                  <Box mb={2}>
                    <Typography
                      variant={'h6'}
                      color="textSecondary"
                    >
                      {parse(sub_text)}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    className={classes.extraLargeButton}
                    classes={{ label: classes.LargeButton }}
                    href={parse(button_url)}
                  >
                    {parse(button_text)}
                  </Button>
                </div>
              </div>
            </Card>
          </Box>
        </div>
      </div>
    </Fragment>
  );


}

HeadSection.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object
};

export default withWidth()(
  withStyles(styles, { withTheme: true })(HeadSection)
);
