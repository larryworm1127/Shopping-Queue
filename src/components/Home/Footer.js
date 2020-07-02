import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Grid, TextField, Typography } from '@material-ui/core';


class Footer extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.footerWrapper}>
        <div className={classes.footerInner}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6} lg={1}/>
            <Grid item xs={12} md={6} lg={4}>
              <form>
                <Typography variant="h3" paragraph className={classes.bigFont}>
                  Contact Us
                </Typography>
                <Box display="flex" flexDirection="column">
                  <Box mb={1}>
                    <TextField
                      variant="outlined"
                      multiline
                      placeholder="Contact us"
                      rows={4}
                      className={classes.inputField}
                      fullWidth
                      required
                    />
                  </Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    className={classes.button}
                  >
                    Submit
                  </Button>
                </Box>
              </form>
            </Grid>

            <Grid item xs={12} md={6} lg={2}/>

            <Grid item xs={12} md={6} lg={4}>
              <Typography variant="h3" paragraph className={classes.bigFont}>
                About Us
              </Typography>
              <Typography className={classes.paragraph} paragraph>
                Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce
                euismod convallis velit, eu auctor lacus vehicula sit amet.
              </Typography>

            </Grid>
            <Grid item xs={12} md={6} lg={1}/>
          </Grid>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Footer;
