import React from 'react';
import List from '@material-ui/core/List';
import StoreDetailListItem from './StoreDetailListItem';


class StoreDetailList extends React.Component {

  render() {
    const { store } = this.props;

    return (
      <React.Fragment>
        <List>
          <StoreDetailListItem label="Address" data={store.address}/>
          <StoreDetailListItem label="Store Type" data={store.type}/>
          <StoreDetailListItem label="Opening Time" data={store.openingTime}/>
          <StoreDetailListItem label="Closing Time" data={store.closingTime}/>
          <StoreDetailListItem label="Customer Limit" data={store.customerLimit}/>
          <StoreDetailListItem label="Customer Shop Time Limit" data={store.customerShopTime}/>
        </List>
      </React.Fragment>
    );
  }
}

export default StoreDetailList;
