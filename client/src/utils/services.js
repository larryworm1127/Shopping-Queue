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


const getColor = (index) => {
  const colors = [
    '#00C853',
    '#6200EA',
    '#0091EA'
  ];
  return colors[index];
};


const createServiceData = (color, headline, text, icon, link) => {
  return { color, headline, text, icon, link };
};

export const getServiceDataShopper = (favoriteStores, queueHistory) => {
  const info = {
    services: [],
    secondServices: [],
    title: '',
    secondTitle: ''
  };
  const favoriteStoresCopy = JSON.parse(JSON.stringify(favoriteStores));
  const queueHistoryCopy = JSON.parse(JSON.stringify(queueHistory));

  info.services = favoriteStoresCopy.slice(0, 3).map((store, index) => {
    return createServiceData(
      getColor(index),
      store.storeName,
      store.type,
      <LocalGroceryStore/>,
      `/store/${store.username}`
    );
  });
  info.title = 'Favorite stores';

  info.secondServices = queueHistoryCopy.slice(0, 3).map((queue, index) => {
    return createServiceData(
      getColor(index),
      queue.store.storeName,
      queue.store.type,
      <LocalGroceryStore/>,
      `/store/${queue.store.username}`
    );
  });
  info.secondTitle = 'Queue History';

  return info;
};

export const getServiceDataStore = (numOfQueues, numOfPeople, avgQueueTime) => {
  return {
    services: [
      createServiceData('#00C853', 'Current # of Queues', `${numOfQueues} total queues`,
        <People/>, 'store/queues'),
      createServiceData('#6200EA', 'Total # of Customers', `${numOfPeople} total customers`,
        <People/>, 'store/shoppers'),
      createServiceData('#0091EA', 'Average shop time', `${avgQueueTime} minutes`,
        <Clock/>, 'store/shoppers')
    ],
    secondServices: [],
    title: 'Today\'s Stats',
    secondTitle: ''
  };
};

export const getServiceDataAdmin = (messages, shoppers, stores) => {
  return {
    services: [
      createServiceData('#00C853', 'Issue Messages', `${messages} issues`, <MessageIcon/>, 'admin/messages'),
      createServiceData('#6200EA', 'Shoppers', `${shoppers} shoppers`, <People/>, 'admin/shopper/queues'),
      createServiceData('#0091EA', 'Shop Owners', `${stores} Shop owners`, <People/>, 'admin/store/queues')
    ],
    secondServices: [],
    title: 'User Stats',
    secondTitle: ''
  };
};

export const getServiceDataDefault = () => {
  return {
    services: [
      createServiceData('#00C853', 'Queue Management', 'Broader queue Management', <BuildIcon/>),
      createServiceData('#6200EA', 'Advanced Schedule', 'Schedule queue in advance', <CalendarTodayIcon/>),
      createServiceData('#0091EA', 'B2C communication', 'Notify queueing shoppers', <MessageIcon/>),
      createServiceData('#d50000', 'Access Everywhere', 'Access your queue settings', <ComputerIcon/>),
      createServiceData('#DD2C00', 'User stats', 'Every user has access to their stats', <BarChartIcon/>),
      createServiceData('#64DD17', 'Customer service', '24/7 support', <HeadsetMicIcon/>)
    ],
    secondServices: [],
    title: 'Services',
    secondTitle: ''
  };
};
