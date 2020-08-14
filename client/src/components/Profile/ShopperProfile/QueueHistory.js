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
import { getShopperQueueHistory } from '../../../actions/shopper';
import ContentTitle from '../../ContentTitle';


class QueueHistory extends React.Component {

  componentDidMount() {
    getShopperQueueHistory(this.props.username, this);
  }

  state = {
    queueHistory: []
  };

  handleRemoveQueueHistory = (event, index) => {
    event.preventDefault();

    const { shopper } = this.props;
    shopper.queueHistory.splice(index, 1);
    this.setState({
      queueHistory: shopper.queueHistory
    });
  };

  render() {
    console.log(this.state.queueHistory);
    const { classes } = this.props;
    const { queueHistory } = this.state;

    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <ContentTitle isEmpty={queueHistory.length === 0} name="Queue History"/>

              {(queueHistory.length !== 0) && (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Shop Name</TableCell>
                      <TableCell align="center">Address</TableCell>
                      <TableCell align="center">Date Booked</TableCell>
                      <TableCell align="center">Queued For</TableCell>
                      <TableCell/>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {queueHistory.map(({ store, searchDate, queuedFor }, index) => (
                      <TableRow key={uid(index)}>
                        <TableCell align="center">
                          {store.storeName}
                        </TableCell>
                        <TableCell align="center">
                          {store.address}
                        </TableCell>
                        <TableCell align="center">
                          {new Date(searchDate).toLocaleString()}
                        </TableCell>
                        <TableCell align="center">
                          {new Date(queuedFor).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={(event => this.handleRemoveQueueHistory(event, index))}
                          >
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
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
