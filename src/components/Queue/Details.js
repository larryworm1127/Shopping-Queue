import React from 'react';
import { getStoreByUsername } from '../../utils/stores';
import { styles } from './style';
import { withStyles } from '@material-ui/core';

import StoreDetailList from '../Store/StoreDetailList';


class ShowDetails extends React.Component {

  render() {
    const { classes, storeName, closePopup } = this.props;

    return (
      <div className={classes.details}>
        <div className={classes.detailsInner}>
          <StoreDetailList store={getStoreByUsername(storeName)}/>
          <button className={classes.button2} onClick={closePopup}>ok</button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ShowDetails);
