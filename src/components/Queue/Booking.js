import React from 'react';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { removeBooking } from '../../utils/queue';
import DetailsWindow from './Details';
import { styles } from './style';
import { withStyles } from '@material-ui/core';


class Booking extends React.Component {

  state = { seen: false };

  toggleDetails() {
    this.setState({
      seen: !this.state.seen
    });
  }

  render() {
    const { booking, queueComponent, classes } = this.props;

    return (
      <TableRow className={classes.booking} key={booking.store}>
        <TableCell component="th" scope="row">
          {booking.store.name}
        </TableCell>

        <TableCell component="th" scope="row">
          {booking.position}
        </TableCell>

        <TableCell component="th" scope="row">
          {booking.date}
        </TableCell>

        <TableCell component="th" scope="row">
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={this.toggleDetails.bind(this)}
          >
            DETAILS
          </Button>

          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={
              removeBooking.bind(this, queueComponent, booking)
            }
            href={'/store/' + booking.store.id}
          >
            EDIT BOOKING
          </Button>

          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={
              removeBooking.bind(this, queueComponent, booking)
            }
          >
            LEAVE QUEUE
          </Button>

          {this.state.seen && (
            <DetailsWindow
              storeName={booking.store.name}
              closePopup={this.toggleDetails.bind(this)}
            />
          )}
        </TableCell>
      </TableRow>
    );
  }
}

export default withStyles(styles)(Booking);
