import React from 'react';
import Container from '@material-ui/core/Container';
import { Paper, TableContainer, withStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import QueueRow from './QueueRow';
import { uid } from 'react-uid';
import TableCell from '@material-ui/core/TableCell';
import { styles } from './style';
import { getCurrentQueues, removeQueue } from '../../actions/queue';


class QueuesTable extends React.Component {

  componentDidMount() {
    const { username, currentUser, isStore } = this.props;
    getCurrentQueues((username) ? username : currentUser, this, isStore);
  }

  state = {
    queues: []
  };

  removeSingleQueue = (queue, index) => {
    removeQueue(queue._id, this, index)
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Container>
          <TableContainer component={Paper} className={classes.bookingList}>
            <Table>
              <TableHead>
                <TableRow scope="row">
                  <TableCell className={classes.tableCellHead}/>
                  <TableCell component="th" scope="row" align='center' className={classes.tableCellHead}>
                    Shopper
                  </TableCell>
                  <TableCell component="th" scope="row" align='center' className={classes.tableCellHead}>
                    Store
                  </TableCell>
                  <TableCell component="th" scope="row" align='center' className={classes.tableCellHead}>
                    Time Booked
                  </TableCell>
                  <TableCell component="th" scope="row" align='center' className={classes.tableCellHead}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {this.state.queues.map((booking, index) => (
                  <QueueRow
                    key={uid(booking)}
                    queue={booking}
                    removeQueue={this.removeSingleQueue}
                    index={index}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(QueuesTable);
