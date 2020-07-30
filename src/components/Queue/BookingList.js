import React from 'react';
import { uid } from 'react-uid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Booking from './Booking';
import { styles } from './style';
import { Paper, TableContainer, withStyles } from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';


class BookingList extends React.Component {

  render() {
    const { queues, classes, removeQueue } = this.props;

    const StyledTableCell = withStyles((theme) => ({
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 14,
      },
    }))(TableCell);

    return (
      <TableContainer component={Paper} className={classes.bookingList}>
        <Table>
          <TableHead>
            <TableRow scope="row">
              <StyledTableCell/>
              <StyledTableCell component="th" scope="row" align='center'>
                Shopper
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" align='center'>
                Store
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" align='center'>
                Arrive by
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" align='center'>
                Time Booked
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" align='center'>
                Actions
              </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {queues.map((booking, index) => (
              <Booking
                key={uid(booking)}
                queue={booking}
                removeQueue={removeQueue}
                index={index}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default withStyles(styles)(BookingList);
