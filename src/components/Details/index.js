import React from 'react';
import './styles.css';
import { stores } from '../../utils/stores';

class ShowDetails extends React.Component {

  state = {store: stores.find(x => x.name === this.props.store)};

  render() {
    return (
        <div className='details'>
            <div className='details_inner'>
                <div class="storeinfo"><strong>Store:</strong> {this.state.store.name}</div>
                <div class="storeinfo"><strong>Address:</strong> {this.state.store.address}</div>
                <div class="storeinfo"><strong>Type:</strong> {this.state.store.type}</div>
                <div class="storeinfo"><strong>Store hours:</strong> {this.state.store.openingTime} to {this.state.store.closingTime}</div>
                <div class="storeinfo"><strong>Max # of customers in store:</strong> {this.state.store.customerLimit}</div>
                <div class="storeinfo"><strong>Allowed time to shop:</strong> {this.state.store.customerShopTime} min</div>
                <button class="button2" onClick={this.props.closePopup}>ok</button>
            </div>
        </div>

    );
    }
}

export default ShowDetails;