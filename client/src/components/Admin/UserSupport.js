import React from 'react';
import { styles } from './style';
import { Paper, TableContainer, Typography, withStyles } from '@material-ui/core';
import NavBar from '../Nav/navbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import MessageTableRow from './MessageTableRow';
import { uid } from 'react-uid';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import { getSearchedMessages } from '../../actions/admin';
import { getEmptyRows } from '../../utils/utils';
import TablePaginationFooter from '../Util/TablePaginationFooter';


class UserSupport extends React.Component {

  componentDidMount() {
    getSearchedMessages('', this);
  }

  state = {
    messages: [],
    page: 0,
    rowsPerPage: 5,
    open: false
  };

  setOpen = (value) => {
    this.setState({
      open: value
    });
  };

  handleOnInputChange = (event) => {
    getSearchedMessages(event.target.value, this);
  };

  render() {
    const { classes, isLoggedIn, userType } = this.props;
    const { messages, page, rowsPerPage } = this.state;
    const emptyRows = getEmptyRows(messages, page, rowsPerPage);

    return (
      <React.Fragment>
        <NavBar userType={userType} isLoggedIn={isLoggedIn}/>
        <CssBaseline/>

        <Typography variant='h3' align='center' className={classes.titleText}>
          User Support Messages
        </Typography>

        <TableContainer component={Paper} className={classes.table}>
          <Card>
            <CardActions>
              <TextField
                variant="outlined"
                label="Search..."
                onChange={this.handleOnInputChange}
              />
            </CardActions>
          </Card>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableCellHead}/>
                <TableCell className={classes.tableCellHead} align="center">User</TableCell>
                <TableCell className={classes.tableCellHead} align="center">User Type</TableCell>
                <TableCell className={classes.tableCellHead} align="center">Issue Title</TableCell>
                <TableCell className={classes.tableCellHead} align="center">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                  ? messages.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : messages
              ).map((message, index) => (
                <MessageTableRow
                  key={uid(message)}
                  message={message}
                  index={index}
                  comp={this}
                />
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6}/>
                </TableRow>
              )}
            </TableBody>

            <TablePaginationFooter
              data={messages}
              page={page}
              rowsPerPage={rowsPerPage}
              comp={this}
            />
          </Table>
        </TableContainer>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(UserSupport));
