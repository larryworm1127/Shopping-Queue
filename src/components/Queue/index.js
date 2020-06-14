/*  Full Queue component */
// Everything here was previously in the App component.
import React from "react";

// Importing components
import Header from "./../Header";
import StudentList from "./../StudentList";
import StudentForm from "./../StudentForm";

// Importing actions/required methods
import { addStudent } from "../../actions/queue";

class Queue extends React.Component {
  ///  React 'state'.
  // Allows us to keep track of changing data in this component.
  state = {
    studentName: "",
    studentCourse: "",
    students: [
      { name: "James", course: "CSC108" },
      { name: "Kate", course: "CSC309" }
    ]
  };

  // Generic handler for whenever we type in an input box.
  // We change the state for the particular property bound to the textbox from the event.
  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    // log(name)

    // 'this' is bound to the Queue component in this arrow function.
     //  In arrow functinos, 'this' is bound to the enclosing lexical function/global scope
     //  where it is *defined*.  This is different than 'this' in normal functions,
     //  which are bound at the call-site.
    this.setState({
      [name]: value // [name] sets the object property name to the value of the `name` variable.
    });
  };

  // Each section of the Queue has its own componenet, cleaning up the
  // JSX a lot.
  render() {
    return (
      <div className="App">
        {/* Header component with text props. */}
        <Header
          title="Student Help Queue Summer 2020"
          subtitle="Below are the next students in line for help."
        />

        {/* Student Form component with text and function props. */}
        <StudentForm
          studentName={this.state.studentName}
          studentCourse={this.state.studentCourse}
          position={this.state.position}
          handleChange={this.handleInputChange}
          addStudent={() => addStudent(this)}
        />

        {/* The Student List */}
        <StudentList students={this.state.students} queueComponent={this} />
      </div>
    );
  }
}

export default Queue;
