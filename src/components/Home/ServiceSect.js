import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, withStyles, withWidth } from '@material-ui/core';

import BuildIcon from '@material-ui/icons/Build';
import ComputerIcon from '@material-ui/icons/Computer';
import BarChartIcon from '@material-ui/icons/BarChart';
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import MeassageIcon from '@material-ui/icons/Message';
import LocalGroceryStore from '@material-ui/icons/LocalGroceryStore';
import Iconcard from './IconCard';
import classNames from 'classnames';
import { styles } from './style';
import store from 'store';
import parse from 'html-react-parser';

let services = [
  {
    color: '#00C853',
    headline: 'Service 1',
    text:
      'Our service',
    icon: <BuildIcon />,
  },
  {
    color: '#6200EA',
    headline: 'Service 2',
    text:
      'Our service',
    icon: <CalendarTodayIcon />,
  },
  {
    color: '#0091EA',
    headline: 'Service 3',
    text:
      'Our service',
    icon: <MeassageIcon />,
  },
  {
    color: '#d50000',
    headline: 'Service 4',
    text:
      'Our service',
    icon: <ComputerIcon />,
  },
  {
    color: '#DD2C00',
    headline: 'Service 5',
    text:
      'Our service',
    icon: <BarChartIcon />,
  },
  {
    color: '#64DD17',
    headline: 'Service 6',
    text:
      'Our service',
    icon: <HeadsetMicIcon />,
  },

];




function ServiceSect(props) {
  const { classes } = props;
  let title_text = 'Services';
  let second_title = '';
  let second_services = [];
  if (store.get('loggedIn')) {
    title_text = 'Recommended Vendors';
    second_title = 'Based off your Queue History'

    second_services = [
      {
        color: '#00C853',
        headline: 'BallMart',
        text:
          'Biggest Box store',
        icon: <LocalGroceryStore />,
      },
      {
        color: '#6200EA',
        headline: 'Canadian wire',
        text:
          'We got All the wires and more',
        icon: <LocalGroceryStore />,
      },
      {
        color: '#0091EA',
        headline: 'Bow\'s',
        text:
          'We got all your bows',
        icon: <LocalGroceryStore />,
      },
    ];

    services = [
      {
        color: '#00C853',
        headline: 'No deals',
        text:
          'Only deal Grocery',
        icon: <LocalGroceryStore />,
      },
      {
        color: '#6200EA',
        headline: 'Bestco',
        text:
          'Your one stop shop',
        icon: <LocalGroceryStore />,
      },
      {
        color: '#0091EA',
        headline: 'Tesco Restaurants',
        text:
          'Chain restaurant for Soul Food',
        icon: <LocalGroceryStore />,
      },
    ];
  }
  return (
    <div className="container-fluid main_div">
      <div className={classNames(classes.containerFix, 'container')}>
        <Typography variant="h3" align="center">
          {parse(title_text)}
        </Typography>
      </div>
      <div className={classNames(classes.container)}>
        <Grid container spacing={2}>
          {
            services.map(element => (
              <Grid
                item
                xs={6}
                md={4}
                key={element.headline}
              >
                <Iconcard
                  Icon={element.icon}
                  color={element.color}
                  headline={element.headline}
                  text={element.text}
                />
              </Grid>
            ))
          }
        </Grid>
      </div>
      <div className={classNames(classes.containerFix, 'container')}>
        <Typography variant="h3" align="center">
          {parse(second_title)}
        </Typography>
      </div>
      <div className={classNames(classes.container)}>
        <Grid container spacing={2}>
          {
            second_services.map(element => (
              <Grid
                item
                xs={6}
                md={4}
                key={element.headline}
              >
                <Iconcard
                  Icon={element.icon}
                  color={element.color}
                  headline={element.headline}
                  text={element.text}
                />
              </Grid>
            ))
          }
        </Grid>
      </div>
    </div>

  );
}

ServiceSect.propTypes = {
  width: PropTypes.string.isRequired
};


export default withWidth()(
  withStyles(styles)(ServiceSect));
