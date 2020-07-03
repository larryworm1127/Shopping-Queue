import React from 'react';
import { stores } from '../../utils/stores';
import { styles } from './style';
import { withStyles } from '@material-ui/core';

import StoreDetailList from '../Store/StoreDetailList';


class ShowDetails extends React.Component {

  state = {
    store: stores.find(x => x.name === this.props.store.name)
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.details}>
        <div className={classes.detailsInner}>
          <StoreDetailList store={this.state.store}/>
          <button className={classes.button2} onClick={this.props.closePopup}>ok</button>
        </div>
      </div>

    );
  }
}

export default withStyles(styles)(ShowDetails);