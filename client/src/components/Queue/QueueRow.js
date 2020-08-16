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
import RemoveConfirmDialog from '../Util/RemoveConfirmDialog';


class QueueRow extends React.Component {

  state = {
    detailOpen: false,
    alertOpen: false
  };

  setDetailOpen = (value) => {
    this.setState({
      detailOpen: value
    });
  };

  setAlertOpen = (value) => {
    this.setState({
      alertOpen: value
    });
  };

  render() {
    const { queue, classes, removeQueue, index } = this.props;

    return (
      <React.Fragment>
        <TableRow className={classes.queueRow}>
          <TableCell>
            <IconButton size="small" onClick={() => this.setDetailOpen(!this.state.detailOpen)}>
              {this.state.detailOpen ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
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
              onClick={() => this.setAlertOpen(true)}
            >
              Remove Queue
            </Button>
          </TableCell>

          <RemoveConfirmDialog
            alertOpen={this.state.alertOpen}
            setAlertOpen={this.setAlertOpen}
            removeThunk={() => removeQueue(queue, index)}
            removeType="Queue"
          />
        </TableRow>

        <TableRow>
          <TableCell className={classes.tableCellCollapse} colSpan={6}>
            <Collapse in={this.state.detailOpen} timeout="auto" unmountOnExit>
              <QueueDetails queue={queue}/>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(QueueRow);
