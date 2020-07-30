import React from 'react';
import { withStyles } from '@material-ui/core';
import { getStoreByUsername } from '../../utils/stores';
import store from 'store';
import { styles } from './style';
import BookingList from '../Queue/QueueList';
import Container from '@material-ui/core/Container';


class StoreQueuesTable extends React.Component {

  constructor(props) {
    super(props);

    const { storeName } = props;
    this.state = {
      queues: [...getStoreByUsername((storeName === undefined) ? store.get('user') : storeName).currentQueue]
    };
  }

  removeQueue = (index) => {
    const { storeName } = this.props;
    const storeObj = getStoreByUsername((storeName === undefined) ? store.get('user') : storeName);
    storeObj.currentQueue.splice(index, 1);

    this.setState({
      queues: [...storeObj.currentQueue]
    });
  };

  render() {
    return (
      <React.Fragment>
        <Container>
          <BookingList queues={this.state.queues} removeQueue={this.removeQueue}/>
        </Container>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(StoreQueuesTable);
