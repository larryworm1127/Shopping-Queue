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


const getColor = (index) => {
  const colors = [
    '#00C853',
    '#6200EA',
    '#0091EA'
  ];
  return colors[index];
};


// Hardcoded help-requests data that would be replaced with
// external API calls in phase 2
const createRowData = (user, type, message, date) => {
  return { user, type, message, date };
};


// Hardcoded store recommendation data that would be replaced
// with external API calls in phase 2.
const createServiceData = (color, headline, text, icon, link) => {
  return { color, headline, text, icon, link };
};


export const getServiceData = (id, username) => {
  switch (id) {
    case 0:
      return {
        services: stores.slice(0, 3).map((store, index) => {
          return createServiceData(
            getColor(index),
            store.name,
            store.type,
            <LocalGroceryStore/>,
            `/store/${store.id}`
          );
        }),
        secondServices: getShopper(username).queueHistory.slice(0, 3).map((queue, index) => {
          return createServiceData(
            getColor(index),
            queue.store.name,
            queue.store.type,
            <LocalGroceryStore/>,
            `/store/${queue.store.id}`
          );
        }),
        rows: undefined,
        title: 'Recommended Stores',
        secondTitle: 'Queue History',
      };
    case 1:
      return {
        services: [
          createServiceData('#00C853', 'Current Queue', '200 shoppers in queue', <People/>, 'store/queues'),
          createServiceData('#6200EA', 'Total Shoppers', '500 total shoppers', <People/>, 'store/shoppers'),
          createServiceData('#0091EA', 'Average wait time', '10 minutes', <Clock/>, 'store/shoppers')
        ],
        title: 'Shoppers Stats',
        secondTitle: '',
        secondServices: [],
        rows: undefined,
      };
    case 2:
      return {
        services: [
          createServiceData('#00C853', 'End Users', '200 end users', <People/>),
          createServiceData('#6200EA', 'Online Users', '100 online users', <People/>),
          createServiceData('#0091EA', 'Shop Owners', '100 Shop owners', <People/>)
        ],
        secondServices: [],
        rows: [
          createRowData('Jon Chavez', 'end user', 'Issue with queuing', 'Today 2:30PM'),
          createRowData('No deals', 'Shop owner', 'Issue with deleting user', 'Today 4:30PM'),
          createRowData('Bestco', 'Shop owner', 'Issue with deleting seeing queue', 'Yesterday 4:30PM'),
          createRowData('Jim Joy', 'end user', 'Issue with deleting user', '06/20/2020')
        ],
        title: 'User Stats',
        secondTitle: 'User Support Messages'
      };
    default:
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
        rows: undefined,
        title: 'Services',
        secondTitle: ''
      };
  }
};
