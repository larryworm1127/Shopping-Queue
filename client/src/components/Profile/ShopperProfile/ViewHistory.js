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


class ViewHistory extends React.Component {

  componentDidMount() {
    getShopperViewHistory(this.props.username, this);
  }

  state = {
    viewHistory: [],
  };

  handleRemoveViewHistory = (event, index, id) => {
    event.preventDefault();

    deleteShopperViewHistory(this.props.username, id, this, index);
  };

  render() {
    const { classes } = this.props;
    const { viewHistory } = this.state;

    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <ContentTitle isEmpty={viewHistory.length === 0} name="Store View History"/>

            {(viewHistory.length !== 0) && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Shop Name</TableCell>
                    <TableCell align="center">Address</TableCell>
                    <TableCell align="center">Shop Type</TableCell>
                    <TableCell align="center">Date Searched</TableCell>
                    <TableCell/>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {viewHistory.map(({ store, searchDate, _id }, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{store.storeName}</TableCell>
                      <TableCell align="center">{store.address}</TableCell>
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
                </TableBody>
              </Table>
            )}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ViewHistory);
