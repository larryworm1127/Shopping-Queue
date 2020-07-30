import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { withStyles } from '@material-ui/core';
import { styles } from '../Queue/style';
import MessageDetail from './MessageDetail';


class MessageTableRow extends React.Component {

  state = {
    open: false
  };

  setOpen = (value) => {
    this.setState({
      open: value
    });
  };

  render() {
    const { classes, message } = this.props;

    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton size="small" onClick={() => this.setOpen(!this.state.open)}>
              {this.state.open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row" align="center">
            {message.user}
          </TableCell>
          <TableCell align="center">{message.type}</TableCell>
          <TableCell align="center">{message.message}</TableCell>
          <TableCell align="center">{message.date}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellCollapse} colSpan={6}>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
              <MessageDetail message={message}/>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(MessageTableRow);
