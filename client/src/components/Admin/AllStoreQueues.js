import React from 'react';
import NavBar from '../Nav/navbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  withStyles
} from '@material-ui/core';
import { styles } from './style';
import TableCell from '@material-ui/core/TableCell';
import QueueTableRow from './QueueTableRow';
import { uid } from 'react-uid';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { getSearchedStores } from '../../actions/store';
import { getEmptyRows } from '../../utils/utils';
import TablePaginationFooter from '../TablePaginationFooter';


class AllStoreQueues extends React.Component {

  componentDidMount() {
    getSearchedStores('', this);
  }

  state = {
    page: 0,
    rowsPerPage: 5,
    stores: []
  };

  handleOnInputChange = (event) => {
    getSearchedStores(event.target.value, this);
  };

  render() {
    const { classes, isLoggedIn, userType } = this.props;
    const { stores, page, rowsPerPage } = this.state;
    const emptyRows = getEmptyRows(stores, page, rowsPerPage);

    return (
      <React.Fragment>
        <NavBar isLoggedIn={isLoggedIn} userType={userType}/>
        <CssBaseline/>

        <Typography variant='h3' align='center' className={classes.titleText}>
          All Store Queues
        </Typography>

        <TableContainer component={Paper} className={classes.table}>
          <Card>
            <CardActions>
              <TextField
                variant="outlined"
                label="Search..."
                onChange={this.handleOnInputChange}
              />
              <Button
                size="small"
                color="primary"
              >
                Search
              </Button>
            </CardActions>
          </Card>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell/>
                <TableCell align='center'>Username</TableCell>
                <TableCell align='center'>Store Name</TableCell>
                <TableCell align='center'>Store Type</TableCell>
                <TableCell align='center'>Store Email</TableCell>
                <TableCell align='center'>Address</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(rowsPerPage > 0
                  ? stores.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : stores
              ).map((store) => (
                <QueueTableRow key={uid(store)} store={store}/>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6}/>
                </TableRow>
              )}
            </TableBody>

            <TablePaginationFooter
              data={stores}
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

export default withStyles(styles)(withRouter(AllStoreQueues));
