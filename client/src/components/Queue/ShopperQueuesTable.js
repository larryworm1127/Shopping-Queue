import React from 'react';
import QueueList from './QueueList';
import Container from '@material-ui/core/Container';
import { getShopper } from '../../utils/shoppers';


class ShopperQueuesTable extends React.Component {

  constructor(props) {
    super(props);

    const { shopper, currentUser } = props;
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
    return (
      <React.Fragment>
        <Container>
          <QueueList queues={this.state.queues} removeQueue={this.removeQueue}/>
        </Container>
      </React.Fragment>
    );
  }
}

export default ShopperQueuesTable
