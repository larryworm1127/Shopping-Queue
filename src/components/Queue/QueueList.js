import React from 'react';
import { uid } from 'react-uid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Student from './Queue';
import { styles } from './style';
import { withStyles } from '@material-ui/core';

/* Component for the List of Students */
class StudentList extends React.Component {

  render() {
    const { bookings, queueComponent, classes } = this.props;

    return (
      <Table className={classes.studentList}>
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
          { /* Grocery stores that user is in queue for */}
          {bookings.map(booking => (
            <Student
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

export default withStyles(styles)(StudentList);
