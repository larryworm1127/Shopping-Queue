import React from 'react';
import { withRouter } from 'react-router-dom';
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
import TableCell from '@material-ui/core/TableCell';
import QueueTableRow from './QueueTableRow';
import { uid } from 'react-uid';
import { styles } from './style';
import { getAllShoppers } from '../../actions/admin';


class AllShopperQueues extends React.Component {

  componentDidMount() {
    getAllShoppers(this);
  }

  state = {
    shoppers: []
  };

  render() {
    const { classes, isLoggedIn, userType } = this.props;

    return (
      <React.Fragment>
        <NavBar isLoggedIn={isLoggedIn} userType={userType}/>
        <CssBaseline/>

        <Typography variant='h3' align='center' className={classes.titleText}>
          All Store Queues
        </Typography>

        <TableContainer component={Paper} className={classes.table}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell/>
                <TableCell align='center'>Username</TableCell>
                <TableCell align='center'>Shopper name</TableCell>
                <TableCell align='center'>Shopper Email</TableCell>
                <TableCell align='center'>Address</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {this.state.shoppers.map((shopper) => (
                <QueueTableRow key={uid(shopper)} shopper={shopper}/>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(AllShopperQueues));
