import React from 'react';
import Header from './Header';
import NavBar from '../Nav/navbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withRouter } from 'react-router-dom';
import QueuesTable from './QueuesTable';


class Queue extends React.Component {

  render() {
    const { userType, isLoggedIn } = this.props;

    return (
      <div>
        <CssBaseline/>
        <NavBar userType={userType} isLoggedIn={isLoggedIn}/>
        <Header
          title="My Queues"
          subtitle="Below are the stores you've queued for."
        />
        <QueuesTable {...this.props} isStore={false}/>
      </div>
    );
  }
}

export default withRouter(Queue);
