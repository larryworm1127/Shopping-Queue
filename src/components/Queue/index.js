/*  Full Queue component */
// Everything here was previously in the App component.
import React from 'react';
// Importing components
import Header from './Header';
import StudentList from './QueueList';
import NavBar from '../Nav/navbar';
// Importing utils/required methods
import { getBookings } from '../../utils/queue';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withRouter } from 'react-router-dom';

class Queue extends React.Component {

  state = { bookings: getBookings() };

  // Each section of the Queue has its own componenet, cleaning up the
  // JSX a lot.
  render() {
    return (
      <div>
        <CssBaseline/>
        <NavBar currentPath={this.props.location.pathname}/>
        {/* Header component with text props. */}
        <Header
          title="My Queues"
          subtitle="Below are the grocery stores you've queued for."
        />

        {/* Student Form component with text and function props.
        <StudentForm
          studentName={this.state.studentName}
          studentCourse={this.state.studentCourse}
          position={this.state.position}
          handleChange={this.handleInputChange}
          addStudent={() => addStudent(this)}
        />
        */}
        {/* The Student List */}
        <StudentList bookings={this.state.bookings} queueComponent={this}/>
      </div>
    );
  }
}

export default withRouter(Queue);
