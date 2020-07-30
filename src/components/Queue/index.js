/*  Full Queue component */
// Everything here was previously in the App component.
import React from 'react';
// Importing components
import Header from './Header';
import BookingList from './QueueList';
import NavBar from '../Nav/navbar';
// Importing utils/required methods
import CssBaseline from '@material-ui/core/CssBaseline';
import { withRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import store from 'store';
import { getShopper } from '../../utils/shoppers';

class Queue extends React.Component {

  constructor(props) {
    super(props);

    const { shopper } = props;
    this.state = {
      queues: [...getShopper((shopper === undefined) ? store.get('user') : shopper).currentQueue]
    };
  }

  removeQueue = (index) => {
    const { shopper } = this.props;
    const storeObj = getShopper((shopper === undefined) ? store.get('user') : shopper);
    storeObj.currentQueue.splice(index, 1);

    this.setState({
      queues: [...storeObj.currentQueue]
    });
  };

  render() {
    const { location } = this.props;

    return (
      <div>
        <CssBaseline/>
        <NavBar currentPath={location.pathname}/>
        <Header
          title="My Queues"
          subtitle="Below are the grocery stores you've queued for."
        />
        <Container>
          <BookingList queues={this.state.queues} removeQueue={this.removeQueue}/>
        </Container>
      </div>
    );
  }
}

export default withRouter(Queue);
