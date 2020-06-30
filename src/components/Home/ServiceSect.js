import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, withStyles, withWidth, makeStyles } from '@material-ui/core';
import BuildIcon from '@material-ui/icons/Build';
import ComputerIcon from '@material-ui/icons/Computer';
import BarChartIcon from '@material-ui/icons/BarChart';
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import MeassageIcon from '@material-ui/icons/Message';
import LocalGroceryStore from '@material-ui/icons/LocalGroceryStore';
import People from '@material-ui/icons/PeopleAlt';
import Iconcard from './IconCard';
import classNames from 'classnames';
import { styles } from './style';
import store from 'store';
import parse from 'html-react-parser';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
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
  if (store.get('loggedIn') && store.get('loginas') === 0) {
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
  else if (store.get('loggedIn') && store.get('loginas') === 2) {
    title_text = 'User Stats';
    let second_title = 'User Support Messages';
    const StyledTableCell = withStyles((theme) => ({
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 14,
      },
    }))(TableCell);
    const StyledTableRow = withStyles((theme) => ({
      root: {
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
      },
    }))(TableRow);
    services = [
      {
        color: '#00C853',
        headline: 'End Users',
        text:
          '200 end users',
        icon: <People />,
      },
      {
        color: '#6200EA',
        headline: 'Online Users',
        text:
          '100 online users',
        icon: <People />,
      },
      {
        color: '#0091EA',
        headline: 'Shop Owners',
        text:
          '100 Shop owners',
        icon: <People />,
      },
    ];
    function createData(user, type, message, date) {
      return { user, type, message, date, };
    }

    const rows = [
      createData('Jon Chavez', 'end user', 'Issue with queuing', 'Today 2:30PM'),
      createData('No deals', 'Shop owner', 'Issue with deleting user', 'Today 4:30PM'),
      createData('Bestco', 'Shop owner', 'Issue with deleting seeing queue', 'Yesterday 4:30PM'),
      createData('Jim Joy', 'end user', 'Issue with deleting user', '06/20/2020'),
    ];
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

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>User</StyledTableCell>
                <StyledTableCell align="center">User Type</StyledTableCell>
                <StyledTableCell align="center">Messages</StyledTableCell>
                <StyledTableCell align="center">Date</StyledTableCell>
                <StyledTableCell align="center">Reply</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.user}>
                  <StyledTableCell component="th" scope="row">
                    {row.user}
                  </StyledTableCell>

                  <StyledTableCell align="center">{row.type}</StyledTableCell>
                  <StyledTableCell align="center">{row.message}</StyledTableCell>
                  <StyledTableCell align="center">{row.date}</StyledTableCell>
                  <StyledTableCell align="center"><Button variant="contained" color="secondary">
                    Reply
      </Button></StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </div>
    );
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
