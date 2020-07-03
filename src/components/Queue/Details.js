import React from 'react';
import { stores } from '../../utils/stores';
import { styles } from './style';
import { withStyles } from '@material-ui/core';


class ShowDetails extends React.Component {

  state = {
    store: stores.find(x => x.name === this.props.store)
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.details}>
        <div className={classes.detailsInner}>
          <div className={classes.storeInfo}>
            <strong>Store:</strong> {this.state.store.name}
          </div>
          <div className={classes.storeInfo}>
            <strong>Address:</strong> {this.state.store.address}
          </div>
          <div className={classes.storeInfo}>
            <strong>Type:</strong> {this.state.store.type}
          </div>
          <div className={classes.storeInfo}>
            <strong>Store hours:</strong> {this.state.store.openingTime} to {this.state.store.closingTime}
          </div>
          <div className={classes.storeInfo}>
            <strong>Max # of customers in store:</strong> {this.state.store.customerLimit}
          </div>
          <div className={classes.storeInfo}>
            <strong>Allowed time to shop:</strong> {this.state.store.customerShopTime} min
          </div>
          <button className={classes.button2} onClick={this.props.closePopup}>ok</button>
        </div>
      </div>

    );
  }
}

export default withStyles(styles)(ShowDetails);