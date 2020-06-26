import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';


function createQueueData(shopName, address, bookedDate, dateQueued) {
  return {shopName, address, bookedDate, dateQueued}
}

const queueRows = [
  createQueueData('Floor Mart', '123 Street', ' 11:00 AM 03-05-2020', '02-05-2020'),
  createQueueData('Shoppers Not Drug Mart', '456 Street', '12:00 PM 09-05-2020', '08-05-2020'),
  createQueueData('Yes Frills', '789 Street', '11:15 AM 16-05-2020', '15-05-2020'),
  createQueueData('Unfreshco', '000 Street', '6:00 PM 24-05-2020', '22-05-2020'),   
];

class QueueHistory extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Typography variant="h3" component="h4">
          Queueing History
        </Typography>
        <TableContainer>
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
        </TableContainer>
      </React.Fragment>
    );
  }
}

export default QueueHistory;