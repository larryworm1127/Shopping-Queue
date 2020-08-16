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
import Typography from '@material-ui/core/Typography';
import TablePaginationFooter from '../TablePaginationFooter';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';


class QueuesTable extends React.Component {

  componentDidMount() {
    const { username, currentUser, isStore } = this.props;
    getCurrentQueues((username) ? username : currentUser, this, isStore, '');
  }

  state = {
    page: 0,
    rowsPerPage: 5,
    queues: []
  };

  removeSingleQueue = (queue, index) => {
    removeQueue(queue._id, this, index);
  };

  handleOnInputChange = (event) => {
    const { username, currentUser, isStore } = this.props;
    getCurrentQueues((username) ? username : currentUser, this, isStore, event.target.value);
  };

  render() {
    const { classes } = this.props;
    const { queues, page, rowsPerPage } = this.state;

    return (
      <Container>
        <TableContainer component={Paper} className={classes.queueList}>
          <Card>
            <CardActions>
              <TextField
                variant="outlined"
                label="Search..."
                onChange={this.handleOnInputChange}
              />
            </CardActions>
          </Card>

          <Table stickyHeader>
            <TableHead>
              <TableRow scope="row">
                <TableCell className={classes.tableCellHead}/>
                <TableCell align='center' className={classes.tableCellHead}>
                  Shopper
                </TableCell>
                <TableCell align='center' className={classes.tableCellHead}>
                  Store
                </TableCell>
                <TableCell align='center' className={classes.tableCellHead}>
                  Time Booked
                </TableCell>
                <TableCell align='center' className={classes.tableCellHead}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(rowsPerPage > 0
                  ? queues.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : queues
              ).map((booking, index) => (
                <QueueRow
                  key={uid(booking)}
                  queue={booking}
                  removeQueue={this.removeSingleQueue}
                  index={index}
                />
              ))}

            </TableBody>

            <TablePaginationFooter
              data={queues}
              page={page}
              rowsPerPage={rowsPerPage}
              comp={this}
            />
          </Table>
        </TableContainer>

        {(queues.length === 0) && (
          <Container>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="h5" color="primary" gutterBottom>
                You have no queues currently.
              </Typography>
            </Paper>
          </Container>
        )}
      </Container>
    );
  }
}

export default withStyles(styles)(QueuesTable);
