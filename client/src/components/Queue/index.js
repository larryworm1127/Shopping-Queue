import React from 'react';
import Header from './Header';
import NavBar from '../Nav/navbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withRouter } from 'react-router-dom';
import ShopperQueuesTable from './ShopperQueuesTable';


class Queue extends React.Component {

  render() {
    const { location, userType, isLoggedIn } = this.props;

    return (
      <div>
        <CssBaseline/>
        <NavBar currentPath={location.pathname} userType={userType} isLoggedIn={isLoggedIn}/>
        <Header
          title="My Queues"
          subtitle="Below are the stores you've queued for."
        />
        <ShopperQueuesTable {...this.props}/>
      </div>
    );
  }
}

export default withRouter(Queue);
