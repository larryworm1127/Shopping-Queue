import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, isWidthUp, withWidth } from "@material-ui/core";

import BuildIcon from "@material-ui/icons/Build";
import ComputerIcon from "@material-ui/icons/Computer";
import BarChartIcon from "@material-ui/icons/BarChart";
import HeadsetMicIcon from "@material-ui/icons/HeadsetMic";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import MeassageIcon from "@material-ui/icons/Message";
import calculateSpacing from "./calculateSpacing";
import Iconcard from "./IconCard";



const iconSize = 30;

const features = [
  {
    color: "#00C853",
    headline: "Service 1",
    text:
      "Our service",
    icon: <BuildIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "0"
  },
  {
    color: "#6200EA",
    headline: "Service 2",
    text:
      "Our service",
    icon: <CalendarTodayIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "200"
  },
  {
    color: "#0091EA",
    headline: "Service 3",
    text:
      "Our service",
    icon: <MeassageIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "0"
  },
  {
    color: "#d50000",
    headline: "Service 4",
    text:
      "Our service",
    icon: <ComputerIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "200"
  },
  {
    color: "#DD2C00",
    headline: "Service 5",
    text:
      "Our service",
    icon: <BarChartIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "0"
  },
  {
    color: "#64DD17",
    headline: "Service 6",
    text:
      "Our service",
    icon: <HeadsetMicIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "200"
  },
 
];

function ServiceSect(props) {
  const { width } = props;
  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container-fluid main_div">
        <Typography variant="h3" align="center" className="lg-mg-bottom">
          Services
        </Typography>
        <div className="container-fluid">
          <Grid container spacing={calculateSpacing(width)}>
            {features.map(element => (
              <Grid
                item
                xs={6}
                md={4}
                data-aos="zoom-in-up"
                data-aos-delay={
                  isWidthUp("md", width) ? element.mdDelay : element.smDelay
                }
                key={element.headline}
              >
                <Iconcard
                  Icon={element.icon}
                  color={element.color}
                  headline={element.headline}
                  text={element.text}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}

ServiceSect.propTypes = {
  width: PropTypes.string.isRequired
};



export default withWidth()(ServiceSect);
