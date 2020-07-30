import React from 'react';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { styles } from './style';
import { withStyles } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import BookingDetails from './BookingDetails';


class Booking extends React.Component {

  state = {
    open: false
  };

  setOpen = (value) => {
    this.setState({
      open: value
    });
  };

  render() {
    const { queue, classes, removeQueue, index } = this.props;

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

    return (
      <React.Fragment>
        <StyledTableRow className={classes.booking}>
          <StyledTableCell>
            <IconButton size="small" onClick={() => this.setOpen(!this.state.open)}>
              {this.state.open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
            </IconButton>
          </StyledTableCell>
          <StyledTableCell align='center'>{queue.username}</StyledTableCell>
          <StyledTableCell align='center'>{queue.store.name}</StyledTableCell>
          <StyledTableCell align='center'>{queue.date}</StyledTableCell>
          <StyledTableCell align='center'>{queue.getTimeQueued()}</StyledTableCell>
          <StyledTableCell component="th" scope="row" align='center'>
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={() => {
                removeQueue(index);
              }}
            >
              Remove Queue
            </Button>
          </StyledTableCell>
        </StyledTableRow>

        <TableRow>
          <TableCell className={classes.tableCellCollapse} colSpan={6}>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
              <BookingDetails booking={queue}/>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Booking);
