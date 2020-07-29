import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import { uid } from 'react-uid';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import { withStyles } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { getStoreByUsername } from '../../utils/stores';
import store from 'store';
import { Queue } from '../../utils/queue';
import { styles } from './style';


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


class StoreQueuesTable extends React.Component {

  constructor(props) {
    super(props);

    const { storeName } = props;
    const storeObj = getStoreByUsername((storeName === undefined) ? store.get('user') : storeName);
    storeObj.currentQueue = [
      new Queue('user', storeObj, '05-07-2020', 30, 1, new Date()),
      new Queue('user', storeObj, '08-07-2020', 20, 2, new Date()),
      new Queue('user2', storeObj, '12-07-2020', 20, 1, new Date())
    ];

    this.state = {
      queues: [...getStoreByUsername((storeName === undefined) ? store.get('user') : storeName).currentQueue]
    };
  }

  removeQueue = (index) => {
    const { storeName } = this.props;
    const storeObj = getStoreByUsername((storeName === undefined) ? store.get('user') : storeName);
    storeObj.currentQueue.splice(index, 1);

    this.setState({
      queues: [...storeObj.currentQueue]
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Table className={classes.table}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="center">User</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">Queue Time</StyledTableCell>
              <StyledTableCell align="center">Estimated Shopping Time</StyledTableCell>
              <StyledTableCell align="center">Number of Shoppers</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {this.state.queues.map((queue, index) => (
              <StyledTableRow key={uid(index)}>
                <StyledTableCell component="th" scope="row">
                  {index}
                </StyledTableCell>

                <StyledTableCell align="center">{queue.username}</StyledTableCell>
                <StyledTableCell align="center">{queue.date}</StyledTableCell>
                <StyledTableCell align="center">{queue.getTimeQueued()}</StyledTableCell>
                <StyledTableCell align="center">{queue.shopTime} min</StyledTableCell>
                <StyledTableCell align="center">{queue.numCustomer}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button variant="contained" color="secondary">
                    Modify
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      this.removeQueue(index);
                    }}
                  >
                    Remove
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(StoreQueuesTable);
