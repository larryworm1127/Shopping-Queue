import React from 'react';
import { Grid, Typography, withStyles } from '@material-ui/core';
import IconCard from './IconCard';
import { styles } from './style';


class Services extends React.Component {

  render() {
    const { serviceData } = this.props;

    return (
      <React.Fragment>
        <Typography variant="h3" align="center">
          {serviceData.title}
        </Typography>
        <Grid container spacing={2}>
          {serviceData.services.map(element => (
            <Grid
              item
              xs={6}
              md={4}
              key={element.headline}
            >
              <IconCard
                Icon={element.icon}
                color={element.color}
                headline={element.headline}
                text={element.text}
                link={element.link}
              />
            </Grid>
          ))
          }
        </Grid>

        <Typography variant="h3" align="center">
          {serviceData.secondTitle}
        </Typography>
        <Grid container spacing={2}>
          {serviceData.secondServices.map(element => (
            <Grid
              item
              xs={6}
              md={4}
              key={element.headline}
            >
              <IconCard
                Icon={element.icon}
                color={element.color}
                headline={element.headline}
                text={element.text}
                link={element.link}
              />
            </Grid>
          ))
          }
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Services);
