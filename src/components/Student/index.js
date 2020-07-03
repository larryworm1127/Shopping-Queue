import React from "react";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Divider from "@material-ui/core/Divider";

import { removeBooking } from "../../utils/queue";
import DetailsWindow from "../Details/index";

import "./styles.css";

class Student extends React.Component {
  /*  Common 'Lifecycle' methods 
      - constructor
      - componentDidMount
      - componentWillUnmount
  */

  constructor(props) {
    // When the componenet is created
    super(props);
    this.state = { seen: false };

  }

  toggleDetails() {
    this.setState({
       seen: !this.state.seen
  });
   }

  render() {
    const { booking, queueComponent } = this.props;

    return (

      <TableRow className="booking" key={booking.store}>

        <TableCell component="th" scope="row">
          {booking.store}
        </TableCell>

        <TableCell component="th" scope="row">
          {booking.position}
        </TableCell>

        <TableCell component="th" scope="row">
          {booking.date}
        </TableCell>

        <TableCell component="th" scope="row">
          <Button
            class="button"
            variant="contained"
            color="secondary"
            onClick={this.toggleDetails.bind(this)}
            >
            DETAILS
          </Button>

          <Button
            class="button"
            variant="contained"
            color="secondary"
            onClick={
                removeBooking.bind(this, queueComponent, booking)
            }
            href={"/store/" + booking.id}
            >
            EDIT BOOKING
          </Button>

          <Button
            class="button"
            variant="contained"
            color="secondary"
            onClick={
              removeBooking.bind(this, queueComponent, booking)
            }
          >
            LEAVE QUEUE
          </Button>



        {this.state.seen ?
            <DetailsWindow
                store={booking.store}
                closePopup={this.toggleDetails.bind(this)}
            />
            : null
        }


        </TableCell>

      </TableRow>




    );

  }
}

export default Student;
