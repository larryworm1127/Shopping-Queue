import React from 'react';
import { Grid, Typography, withStyles } from '@material-ui/core';
import Iconcard from './IconCard';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';


class Services extends React.Component {

  render() {
    const { classes, serviceData } = this.props;

    const StyledTableCell = withStyles((theme) => ({
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 14,
      },
    }))(TableCell);
    const StyledTableRow = withStyles((theme) => ({
      root: {
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
      },
    }))(TableRow);

    return (
      <React.Fragment>
        <div className={classes.containerFix}>
          <Typography variant="h3" align="center">
            {serviceData.title}
          </Typography>
        </div>
        <Grid container spacing={2}>
          {serviceData.services.map(element => (
            <Grid
              item
              xs={6}
              md={4}
              key={element.headline}
            >
              <Iconcard
                Icon={element.icon}
                color={element.color}
                headline={element.headline}
                text={element.text}
              />
            </Grid>
          ))
          }
        </Grid>

        <div className={classes.containerFix}>
          <Typography variant="h3" align="center">
            {serviceData.secondTitle}
          </Typography>
        </div>
        <Grid container spacing={2}>
          {serviceData.secondServices.map(element => (
            <Grid
              item
              xs={6}
              md={4}
              key={element.headline}
            >
              <Iconcard
                Icon={element.icon}
                color={element.color}
                headline={element.headline}
                text={element.text}
              />
            </Grid>
          ))
          }
        </Grid>

        {serviceData.rows !== undefined && (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>User</StyledTableCell>
                  <StyledTableCell align="center">User Type</StyledTableCell>
                  <StyledTableCell align="center">Messages</StyledTableCell>
                  <StyledTableCell align="center">Date</StyledTableCell>
                  <StyledTableCell align="center">Reply</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {serviceData.rows.map((row) => (
                  <StyledTableRow key={row.user}>
                    <StyledTableCell component="th" scope="row">
                      {row.user}
                    </StyledTableCell>

                    <StyledTableCell align="center">{row.type}</StyledTableCell>
                    <StyledTableCell align="center">{row.message}</StyledTableCell>
                    <StyledTableCell align="center">{row.date}</StyledTableCell>
                    <StyledTableCell align="center"><Button variant="contained" color="secondary">
                      Reply
                    </Button></StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </React.Fragment>
    );
  }
}

export default Services;
