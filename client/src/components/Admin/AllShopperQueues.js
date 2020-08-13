import React from 'react';
import { withRouter } from 'react-router-dom';
import NavBar from '../Nav/navbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  withStyles
} from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import QueueTableRow from './QueueTableRow';
import { uid } from 'react-uid';
import { styles } from './style';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { getSearchedShoppers } from '../../actions/shopper';


class AllShopperQueues extends React.Component {

  componentDidMount() {
    getSearchedShoppers("", this);
  }

  state = {
    shoppers: []
  };

  handleOnInputChange = (event) => {
    getSearchedShoppers(event.target.value, this)
  };

  render() {
    const { classes, isLoggedIn, userType } = this.props;

    return (
      <React.Fragment>
        <NavBar isLoggedIn={isLoggedIn} userType={userType}/>
        <CssBaseline/>

        <Typography variant='h3' align='center' className={classes.titleText}>
          All Store Queues
        </Typography>

        <TableContainer component={Paper} className={classes.table}>
        <Card>
          <CardActions>
            <TextField
              variant="outlined"
              label="Search..."
              onChange={this.handleOnInputChange}
            />
            <Button
              size="small"
              color="primary"
            >
              Search
            </Button>
          </CardActions>
        </Card>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell/>
                <TableCell align='center'>Username</TableCell>
                <TableCell align='center'>Shopper name</TableCell>
                <TableCell align='center'>Shopper Email</TableCell>
                <TableCell align='center'>Address</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {this.state.shoppers.map((shopper) => (
                <QueueTableRow key={uid(shopper)} shopper={shopper}/>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(AllShopperQueues));
