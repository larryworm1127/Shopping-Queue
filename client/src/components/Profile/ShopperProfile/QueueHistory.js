import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { styles } from '../style';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { uid } from 'react-uid';


class QueueHistory extends React.Component {

  constructor(props) {
    super(props);
    const { shopper } = this.props;
    this.state = {
      queueHistory: shopper.queueHistory
    };
  }

  handleRemoveQueueHistory = (event, index) => {
    event.preventDefault();

    const { shopper } = this.props;
    shopper.queueHistory.splice(index, 1);
    this.setState({
      queueHistory: shopper.queueHistory
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="h5" color="primary" gutterBottom>
                Queueing History
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Shop Name</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Date Booked</TableCell>
                    <TableCell>Queued For</TableCell>
                    <TableCell/>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.queueHistory.map((queueRow, index) => (
                    <TableRow key={uid(index)}>
                      <TableCell component="th" scope="row">
                        {queueRow.store.name}
                      </TableCell>
                      <TableCell align="left">
                        {queueRow.store.address}
                      </TableCell>
                      <TableCell align="left">
                        {queueRow.getTimeQueued()}
                      </TableCell>
                      <TableCell align="left">
                        {queueRow.date}
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
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(QueueHistory);
