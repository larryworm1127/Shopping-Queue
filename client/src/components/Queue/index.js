import React from 'react';
import Header from './Header';
import QueueList from './QueueList';
import NavBar from '../Nav/navbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { getShopper } from '../../utils/shoppers';


class Queue extends React.Component {

  constructor(props) {
    super(props);

    const { shopper, history, currentUser } = props;
    history.push('/queue');
    this.state = {
      queues: [...getShopper((shopper === undefined) ? currentUser : shopper).currentQueue]
    };
  }

  removeQueue = (index) => {
    const { shopper, currentUser } = this.props;
    const storeObj = getShopper((shopper === undefined) ? currentUser : shopper);
    storeObj.currentQueue.splice(index, 1);

    this.setState({
      queues: [...storeObj.currentQueue]
    });
  };

  render() {
    const { location, userType, isLoggedIn } = this.props;

    return (
      <div>
        <CssBaseline/>
        <NavBar currentPath={location.pathname} userType={userType} isLoggedIn={isLoggedIn}/>
        <Header
          title="My Queues"
          subtitle="Below are the grocery stores you've queued for."
        />
        <Container>
          <QueueList queues={this.state.queues} removeQueue={this.removeQueue}/>
        </Container>
      </div>
    );
  }
}

export default withRouter(Queue);
