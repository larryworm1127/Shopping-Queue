import React from 'react';
import { uid } from 'react-uid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Booking from './Booking';
import { styles } from './style';
import { withStyles } from '@material-ui/core';

class BookingList extends React.Component {

  render() {
    const { bookings, queueComponent, classes } = this.props;

    return (
      <Table className={classes.bookingList}>
        <TableBody>
          <TableRow scope="row">
            <TableCell component="th" scope="row">
                     Store
            </TableCell>

            <TableCell component="th" scope="row">
                  Position in queue
            </TableCell>

            <TableCell component="th" scope="row">
                    Arrive by
            </TableCell>
          </TableRow>
          {bookings.map(booking => (
            <Booking
              key={uid(booking)}
              booking={booking}
              queueComponent={queueComponent}
            />
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default withStyles(styles)(BookingList);
