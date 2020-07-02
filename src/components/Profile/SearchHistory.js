import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core';
import { styles } from './style';


// Since search feature isn't implemented for phase 1
// Below function is used for current data display
// Search history data will be accessed from <shoppers.js> in phase 2
function createSearchData(shopName, address, shopType, date) {
  return { shopName, address, shopType, date };
}

const searchRows = [
  createSearchData('Floor Mart', '123 Street', 'General', '02-05-2020'),
  createSearchData('Shoppers Not Drug Mart', '456 Street', 'General', '08-05-2020'),
  createSearchData('Yes Frills', '789 Street', 'Groceries', '15-05-2020'),
  createSearchData('Unfreshco', '000 Street', 'Groceries', '22-05-2020'),
];

class SearchHistory extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="h5" color="primary" gutterBottom>
                Shop Search History
              </Typography>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Shop Name</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Shop Type</TableCell>
                    <TableCell>Date Searched</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchRows.map((searchRow) => (
                    <TableRow key={searchRow.shopName}>
                      <TableCell component="th" scope="row">
                        {searchRow.shopName}
                      </TableCell>
                      <TableCell align="left">
                        {searchRow.address}
                      </TableCell>
                      <TableCell align="left">
                        {searchRow.shopType}
                      </TableCell>
                      <TableCell align="left">
                        {searchRow.date}
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

export default withStyles(styles)(SearchHistory);