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
import Button from '@material-ui/core/Button';


class SearchHistory extends React.Component {

  constructor(props) {
    super(props);
    const { shopper } = this.props;
    this.state = {
      searchHistory: shopper.searchHistory
    };
  }

  handleRemoveSearchHistory = (event, index) => {
    event.preventDefault();

    const { shopper } = this.props;
    shopper.searchHistory.splice(index, 1);
    this.setState({
      searchHistory: shopper.searchHistory
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
                Shop Search History
              </Typography>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Shop Name</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Shop Type</TableCell>
                    <TableCell>Date Searched</TableCell>
                    <TableCell/>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {this.state.searchHistory.map((search, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {search.store.name}
                      </TableCell>
                      <TableCell align="left">
                        {search.store.address}
                      </TableCell>
                      <TableCell align="left">
                        {search.store.type}
                      </TableCell>
                      <TableCell align="left">
                        {search.date}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={(event => this.handleRemoveSearchHistory(event, index))}
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

export default withStyles(styles)(SearchHistory);