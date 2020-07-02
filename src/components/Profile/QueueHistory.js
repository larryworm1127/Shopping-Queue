import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { styles } from './style';
import { withStyles } from '@material-ui/core';


function createQueueData(shopName, address, bookedDate, dateQueued) {
  return { shopName, address, bookedDate, dateQueued };
}

const queueRows = [
  createQueueData('Floor Mart', '123 Street', ' 11:00 AM 03-05-2020', '02-05-2020'),
  createQueueData('Shoppers Not Drug Mart', '456 Street', '12:00 PM 09-05-2020', '08-05-2020'),
  createQueueData('Yes Frills', '789 Street', '11:15 AM 16-05-2020', '15-05-2020'),
  createQueueData('Unfreshco', '000 Street', '6:00 PM 24-05-2020', '22-05-2020'),
];

class QueueHistory extends React.Component {
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
                    <TableCell>Date Booked</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {queueRows.map((queueRow) => (
                    <TableRow key={queueRow.shopName}>
                      <TableCell component="th" scope="row">
                        {queueRow.shopName}
                      </TableCell>
                      <TableCell align="left">
                        {queueRow.address}
                      </TableCell>
                      <TableCell align="left">
                        {queueRow.bookedDate}
                      </TableCell>
                      <TableCell align="left">
                        {queueRow.dateQueued}
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