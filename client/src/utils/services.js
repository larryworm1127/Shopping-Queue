import LocalGroceryStore from '@material-ui/icons/LocalGroceryStore';
import People from '@material-ui/icons/PeopleAlt';
import React from 'react';
import BuildIcon from '@material-ui/icons/Build';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import MessageIcon from '@material-ui/icons/Message';
import ComputerIcon from '@material-ui/icons/Computer';
import BarChartIcon from '@material-ui/icons/BarChart';
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic';
import Clock from '@material-ui/icons/AccessTime';
import { stores } from './stores';
import { getShopper } from './shoppers';
import { getShopperFavoriteStores } from '../actions/shopper'


const getColor = (index) => {
  const colors = [
    '#00C853',
    '#6200EA',
    '#0091EA'
  ];
  return colors[index];
};

// Hardcoded store recommendation data that would be replaced
// with external API calls in phase 2.
const createServiceData = (color, headline, text, icon, link) => {
  return { color, headline, text, icon, link };
};

export const getServiceDataShopper = (favoriteStores, queueHistory) => {
    const info = {
        services: [],
        secondServices: [],
        title: "",
        secondTitle: ""
    }
    const favoriteStoresCopy =  JSON.parse(JSON.stringify(favoriteStores))
    const queueHistoryCopy =  JSON.parse(JSON.stringify(queueHistory))

    if (favoriteStores.length === 0){
        info.services = [createServiceData('#00C853', 'Queue Management', 'Broader queue Management', <BuildIcon/>),
                         createServiceData('#6200EA', 'Advanced Schedule', 'Schedule queue in advance', <CalendarTodayIcon/>),
                         createServiceData('#0091EA', 'B2C communication', 'Notify queueing shoppers', <MessageIcon/>)]
        info.title = "Services"
    }
    else {
        info.services = favoriteStoresCopy.slice(0, 3).map((store, index) => {
            if (store) {
                return createServiceData(
                    getColor(index),
                    store.storeName,
                    store.type,
                    <LocalGroceryStore/>,
                    `/store/${store.username}`
                );
            }
        })
        info.title = "Favorite stores"
    }

    if (queueHistory.length === 0){
        info.secondServices = [createServiceData('#d50000', 'Access Everywhere', 'Access your queue settings', <ComputerIcon/>),
                               createServiceData('#DD2C00', 'User stats', 'Every user has access to their stats', <BarChartIcon/>),
                               createServiceData('#64DD17', 'Customer service', '24/7 support', <HeadsetMicIcon/>)]
        info.secondTitle = "Services"
    }
    else {
        info.secondServices = queueHistoryCopy.slice(0, 3).map((queue, index) => {
            if (queue) {
                return createServiceData(
                    getColor(index),
                    queue.store.storeName,
                    queue.store.type,
                    <LocalGroceryStore/>,
                   `/store/${queue.store.username}`
                );
            }
        })
        info.secondTitle = "Queue History"
    }

    return info;
}

export const getServiceDataStore = (numOfQueues, numOfPeople, avgQueueTime) => {
    const info = {
        services: [createServiceData('#00C853', 'Current # of Queues',  numOfQueues.toString() + ' total queues', <People/>, 'store/queues'),
                   createServiceData('#6200EA', 'Total # of Customers',  numOfPeople.toString() + ' total customers', <People/>, 'store/shoppers'),
                   createServiceData('#0091EA', 'Average shop time', avgQueueTime.toString() + ' minutes', <Clock/>, 'store/shoppers')
        ],
        secondServices: [],
        title: "Store stats",
        secondTitle: ""
    }

    return info
}

export const getServiceDataAdmin = (messages, shoppers, stores) => {
    const info = {
        services: [createServiceData('#00C853', 'Issue Messages', messages.toString() + ' issues', <MessageIcon/>, 'admin/messages'),
                   createServiceData('#6200EA', 'Shoppers', shoppers.toString() + '  shoppers', <People/>, 'admin/shopper/queues'),
                   createServiceData('#0091EA', 'Shop Owners', stores.toString() + ' Shop owners', <People/>, 'admin/store/queues')
        ],
        secondServices: [],
        title: "User Stats",
        secondTitle: ""
    }

    return info
}

export const getServiceDataDefault = () => {
    const info = {
        services: [createServiceData('#00C853', 'Queue Management', 'Broader queue Management', <BuildIcon/>),
                   createServiceData('#6200EA', 'Advanced Schedule', 'Schedule queue in advance', <CalendarTodayIcon/>),
                   createServiceData('#0091EA', 'B2C communication', 'Notify queueing shoppers', <MessageIcon/>),
                   createServiceData('#d50000', 'Access Everywhere', 'Access your queue settings', <ComputerIcon/>),
                   createServiceData('#DD2C00', 'User stats', 'Every user has access to their stats', <BarChartIcon/>),
                   createServiceData('#64DD17', 'Customer service', '24/7 support', <HeadsetMicIcon/>)
        ],
        secondServices: [],
        title: "Services",
        secondTitle: ""
    }

    return info

}
