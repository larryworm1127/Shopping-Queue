import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

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
    return (
      <React.Fragment>
        <Typography variant="h3" component="h4">
          Shop Search History
        </Typography>
        <TableContainer>
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
        </TableContainer>
      </React.Fragment>
    );
  }
}

export default SearchHistory;