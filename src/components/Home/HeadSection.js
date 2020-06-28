import React, { Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  Typography,
  Card,
  Button,
  Box,
  withStyles,
  withWidth,
} from "@material-ui/core";
import { styles } from './style';

function HeadSection(props) {
  const { classes } = props;
  return (
    <Fragment>
      <div className={classNames("main_div", classes.wrapper)}>
        <div className={classNames("container-fluid", classes.container)}>
          <Box display="flex" justifyContent="center" className="row">
            <Card
              className={classes.card}
              data-aos-delay="200"
              data-aos="zoom-in"
            >
              <div className={classNames(classes.containerFix, "container")}>

                <div>
                  <Typography
                    variant={"h3"}
                  >
                    Shopping Queue Manager
                        </Typography>
                </div>
                <div>
                  <Box mb={2}>
                    <Typography
                      variant={"h6"}
                      color="textSecondary"
                    >
                      Now you don't need to risk your health for shopping
                          </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    className={classes.extraLargeButton}
                    classes={{ label: classes.LargeButton }}
                    href="/register"
                  >
                    Signup
                        </Button>
                </div>

              </div>
            </Card>
          </Box>
        </div>
      </div>
    </Fragment>
  );
}

HeadSection.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object
};

export default withWidth()(
  withStyles(styles, { withTheme: true })(HeadSection)
);
