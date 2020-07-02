import React from "react";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Divider from "@material-ui/core/Divider";

import { removeStudent } from "../../utils/queue";
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
    const { student, queueComponent } = this.props;

    return (

      <TableRow className="student" key={student.name}>

        <TableCell component="th" scope="row">
          {student.name}
        </TableCell>

        <TableCell component="th" scope="row">
          {student.course}
        </TableCell>

        {/* Show how long the student has been waiting for */}
        <TableCell component="th" scope="row">
        {/*
          Waiting for: {Math.floor(this.state.seconds / 60)} minutes{" "}
          {this.state.seconds % 60} seconds.
        */}
        {student.date}
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
            /*onClick={
                redirect to the store page
            }*/
            >
            EDIT BOOKING
          </Button>

          <Button
            class="button"
            variant="contained"
            color="secondary"
            onClick={
              /* Remove button onClick binds the student as the parameter to the remove function. */
              removeStudent.bind(this, queueComponent, student)
              //() => this.removeStudent(student) // this also works
            }
          >
            LEAVE QUEUE
          </Button>



        {this.state.seen ?
            <DetailsWindow
                store={student.name}
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
