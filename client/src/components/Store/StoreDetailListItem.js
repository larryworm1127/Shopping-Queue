import React from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListIcon from '@material-ui/icons/List';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';


class StoreDetailListItem extends React.Component {

  render() {
    const { label, data } = this.props;

    return (
      <ListItem>
        <ListItemIcon>
          <ListIcon/>
        </ListItemIcon>
        <ListItemText>
          <Typography variant='button' display='inline'>{label}:</Typography> {data}
        </ListItemText>
      </ListItem>
    );
  }
}

export default StoreDetailListItem;
