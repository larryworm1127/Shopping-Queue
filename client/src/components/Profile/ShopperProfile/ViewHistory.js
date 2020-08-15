import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core';
import { styles } from '../style';
import Button from '@material-ui/core/Button';
import { deleteShopperViewHistory, getShopperViewHistory } from '../../../actions/shopper';
import ContentTitle from '../../ContentTitle';
import { getEmptyRows } from '../../../utils/utils';
import TablePaginationFooter from '../../TablePaginationFooter';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';


class ViewHistory extends React.Component {

  componentDidMount() {
    getShopperViewHistory(this.props.username, this, '');
  }

  state = {
    page: 0,
    rowsPerPage: 5,
    viewHistory: [],
  };

  handleRemoveViewHistory = (event, index, id) => {
    event.preventDefault();

    deleteShopperViewHistory(this.props.username, id, this, index);
  };

  handleOnInputChange = (event) => {
    getShopperViewHistory(this.props.username, this, event.target.value);
  };

  render() {
    const { classes } = this.props;
    const { viewHistory, page, rowsPerPage } = this.state;
    const emptyRows = getEmptyRows(viewHistory, page, rowsPerPage);

    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <ContentTitle isEmpty={viewHistory.length === 0} name="Store View History"/>

            <Card>
              <CardActions>
                <TextField
                  variant="outlined"
                  label="Search..."
                  onChange={this.handleOnInputChange}
                />
              </CardActions>
            </Card>

            {(viewHistory.length !== 0) && (
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Shop Name</TableCell>
                    <TableCell align="left">Address</TableCell>
                    <TableCell align="center">Shop Type</TableCell>
                    <TableCell align="center">Date Searched</TableCell>
                    <TableCell/>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {(rowsPerPage > 0
                      ? viewHistory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : viewHistory
                  ).map(({ store, searchDate, _id }, index) => (
                    <TableRow key={index} hover>
                      <TableCell align="left">{store.storeName}</TableCell>
                      <TableCell align="left">{store.address}</TableCell>
                      <TableCell align="center">{store.type}</TableCell>
                      <TableCell align="center">{new Date(searchDate).toLocaleString()}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={(event => this.handleRemoveViewHistory(event, index, _id))}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}

                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6}/>
                    </TableRow>
                  )}
                </TableBody>

                <TablePaginationFooter
                  data={viewHistory}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  comp={this}
                />
              </Table>
            )}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ViewHistory);
