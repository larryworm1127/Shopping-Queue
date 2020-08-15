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
import { getShopperSearchHistory } from '../../../actions/shopper';
import ContentTitle from '../../ContentTitle';


class SearchHistory extends React.Component {

  componentDidMount() {
    getShopperSearchHistory(this.props.username, this);
  }

  state = {
    searchHistory: [],
  };

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
    const { searchHistory } = this.state;

    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <ContentTitle isEmpty={searchHistory.length === 0} name="Store Search History"/>

              {(searchHistory.length !== 0) && (
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
                    {searchHistory.map((search, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{search.store.name}</TableCell>
                        <TableCell align="center">{search.store.address}</TableCell>
                        <TableCell align="center">{search.store.type}</TableCell>
                        <TableCell align="center">{search.date}</TableCell>
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
              )}
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SearchHistory);
