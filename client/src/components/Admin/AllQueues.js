import React from 'react';
import NavBar from '../Nav/navbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  withStyles
} from '@material-ui/core';
import { styles } from './style';
import TableCell from '@material-ui/core/TableCell';
import { stores } from '../../utils/stores';
import QueueTableRow from './QueueTableRow';
import { uid } from 'react-uid';
import { withRouter } from 'react-router-dom';


class AllQueues extends React.Component {

  render() {
    const { location, classes, isLoggedIn, userType } = this.props;

    return (
      <React.Fragment>
        <NavBar currentPath={location.pathname} isLoggedIn={isLoggedIn} userType={userType}/>
        <CssBaseline/>

        <Typography variant='h3' align='center' className={classes.titleText}>
          All Store Queues
        </Typography>

        <TableContainer component={Paper} className={classes.table}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell/>
                <TableCell align='center'>Store Name</TableCell>
                <TableCell align='center'>Store Type</TableCell>
                <TableCell align='center'>Store Email</TableCell>
                <TableCell align='center'>Current Queue Size</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {stores.map((store) => (
                <QueueTableRow key={uid(store)} store={store}/>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(AllQueues));
