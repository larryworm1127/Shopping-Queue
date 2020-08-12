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
import QueueDetails from './QueueDetails';


class QueueRow extends React.Component {

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

    return (
      <React.Fragment>
        <TableRow className={classes.queueRow}>
          <TableCell>
            <IconButton size="small" onClick={() => this.setOpen(!this.state.open)}>
              {this.state.open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
            </IconButton>
          </TableCell>
          <TableCell align='center'>{queue.username}</TableCell>
          <TableCell align='center'>{queue.store}</TableCell>
          <TableCell align='center'>{queue.datetimeQueued}</TableCell>
          <TableCell component="th" scope="row" align='center'>
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={() => removeQueue(queue, index)}
            >
              Remove Queue
            </Button>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className={classes.tableCellCollapse} colSpan={6}>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
              <QueueDetails queue={queue}/>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(QueueRow);
