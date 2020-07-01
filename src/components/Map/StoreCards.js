import React from 'react';
import { stores } from '../../utils/stores';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';


class StoreCards extends React.Component {

  render() {
    const { classes, handleHighlight } = this.props;

    return stores.map((store, index) => (
        <Card key={index} id={index}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {store.type}
            </Typography>
            <Typography variant="h5" component="h2">
              {store.name}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {store.address}
            </Typography>
            <Typography variant="body2" component="p">
              Open from <b>{store.openingTime}</b> to <b>{store.closingTime}</b>
              <br/>
              <b>Customer limit:</b> {store.customerLimit}
              <br/>
              <b>Customer Shop Time Limit:</b> {store.customerShopTime} min
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              href={`/store/${store.id}`}
            >
              Queue Here
            </Button>
            <Button
              type="button"
              color="primary"
              onClick={() => {
                handleHighlight(index);
              }}
            >
              Highlight on Map
            </Button>
          </CardActions>
        </Card>
      )
    );
  }
}

export default StoreCards;
