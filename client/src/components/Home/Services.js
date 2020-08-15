import React from 'react';
import { Grid, Typography, withStyles } from '@material-ui/core';
import IconCard from './IconCard';
import { styles } from './style';
import BuildIcon from '@material-ui/icons/Build';


class Services extends React.Component {

  render() {
    const { serviceData } = this.props;

    return (
      <React.Fragment>
        <Typography variant="h3" align="center">
          {serviceData.title}
        </Typography>
        <Grid container spacing={2}>
          {(serviceData.services.length === 0) ? (
            <React.Fragment>
              <Grid item xs={6} md={4}>
                <IconCard
                  Icon={<BuildIcon/>}
                  color={'#00C853'}
                  headline={`You have no ${serviceData.title} currently`}
                />
              </Grid>
            </React.Fragment>
          ) : (serviceData.services.map((element, index) => (
            <Grid item xs={6} md={4} key={index}>
              <IconCard
                Icon={element.icon}
                color={element.color}
                headline={element.headline}
                text={element.text}
                link={element.link}
              />
            </Grid>
          )))}
        </Grid>

        <Typography variant="h3" align="center">
          {serviceData.secondTitle}
        </Typography>
        <Grid container spacing={2}>
          {(serviceData.secondServices.length === 0 && serviceData.secondTitle !== '') ? (
            <React.Fragment>
              <Grid item xs={6} md={4}>
                <IconCard
                  Icon={<BuildIcon/>}
                  color={'#6200EA'}
                  headline={`You have no ${serviceData.secondTitle} currently`}
                />
              </Grid>
            </React.Fragment>
          ) : (serviceData.secondServices.map((element, index) => (
            <Grid item xs={6} md={4} key={index}>
              <IconCard
                Icon={element.icon}
                color={element.color}
                headline={element.headline}
                text={element.text}
                link={element.link}
              />
            </Grid>
          )))}
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Services);
