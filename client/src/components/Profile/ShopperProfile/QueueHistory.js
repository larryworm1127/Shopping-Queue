import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { styles } from '../style';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { uid } from 'react-uid';
import { deleteShopperQueueHistory, getShopperQueueHistory } from '../../../actions/shopper';
import ContentTitle from '../../Util/ContentTitle';
import { getEmptyRows } from '../../../utils/utils';
import TablePaginationFooter from '../../Util/TablePaginationFooter';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';


class QueueHistory extends React.Component {

  componentDidMount() {
    getShopperQueueHistory(this.props.username, this, '');
  }

  state = {
    page: 0,
    rowsPerPage: 5,
    queueHistory: []
  };

  handleRemoveQueueHistory = (event, index, id) => {
    event.preventDefault();

    deleteShopperQueueHistory(this.props.username, id, this, index);
  };

  handleOnInputChange = (event) => {
    getShopperQueueHistory(this.props.username, this, event.target.value);
  };

  render() {
    const { classes } = this.props;
    const { rowsPerPage, page, queueHistory } = this.state;
    const emptyRows = getEmptyRows(queueHistory, page, rowsPerPage);

    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <ContentTitle isEmpty={queueHistory.length === 0} name="Queue History"/>

              <Card>
                <CardActions>
                  <TextField
                    variant="outlined"
                    label="Search..."
                    onChange={this.handleOnInputChange}
                  />
                </CardActions>
              </Card>

              {(queueHistory.length !== 0) && (
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Shop Name</TableCell>
                      <TableCell align="left">Address</TableCell>
                      <TableCell align="center">Date Booked</TableCell>
                      <TableCell align="center">Queued For</TableCell>
                      <TableCell/>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {(rowsPerPage > 0
                        ? queueHistory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : queueHistory
                    ).map(({ store, searchDate, queuedFor, _id }, index) => (
                      <TableRow key={uid(index)} hover>
                        <TableCell align="left">{store.storeName}</TableCell>
                        <TableCell align="left">{store.address}</TableCell>
                        <TableCell align="center">{new Date(searchDate).toLocaleString()}</TableCell>
                        <TableCell align="center">{new Date(queuedFor).toLocaleString()}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={(event => this.handleRemoveQueueHistory(event, index, _id))}
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
                    data={queueHistory}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    comp={this}
                  />
                </Table>
              )}
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(QueueHistory);
