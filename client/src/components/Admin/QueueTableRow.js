import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { withStyles } from '@material-ui/core';
import { styles } from '../Queue/style';
import QueuesTable from '../Queue/QueuesTable';


class QueueTableRow extends React.Component {

  state = {
    open: false
  };

  setOpen = (value) => {
    this.setState({
      open: value
    });
  };

  render() {
    const { classes, store, shopper } = this.props;

    return (store !== undefined) ? (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton size="small" onClick={() => this.setOpen(!this.state.open)}>
              {this.state.open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
            </IconButton>
          </TableCell>
          <TableCell align='center'>{store.username}</TableCell>
          <TableCell align='center'>{store.storeName}</TableCell>
          <TableCell align="center">{store.type}</TableCell>
          <TableCell align='center'>{store.email}</TableCell>
          <TableCell align='center'>{store.address}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellCollapse} colSpan={6}>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
              <QueuesTable username={store.username} isStore={true}/>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton size="small" onClick={() => this.setOpen(!this.state.open)}>
              {this.state.open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
            </IconButton>
          </TableCell>
          <TableCell align='center'>{shopper.username}</TableCell>
          <TableCell align='center'>{`${shopper.firstName} ${shopper.lastName}`}</TableCell>
          <TableCell align='center'>{shopper.email}</TableCell>
          <TableCell align='center'>{shopper.address}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellCollapse} colSpan={6}>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
              <QueuesTable username={shopper.username} isStore={false}/>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(QueueTableRow);
