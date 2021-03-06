import React from 'react';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { uid } from 'react-uid';
import { withStyles } from '@material-ui/core';
import { handleFormField } from '../../utils/utils';


const styles = theme => ({
  formControlLabel: {
    textTransform: 'uppercase',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    color: theme.palette.secondary.main
  },
  formControl: {
    width: '100%',
  }
});


class FormSelectField extends React.Component {

  renderMenuItems(items) {
    const { useIndex } = this.props;

    return items.map((item, index) => (
      <MenuItem
        value={(useIndex !== undefined) ? index : item}
        key={uid(item)}
      >
        {item}
      </MenuItem>
    ));
  }

  render() {
    const { classes, name, label, value, variant, menuItems, comp } = this.props;

    return (
      <React.Fragment>
        <Grid item xs={12}>
          <Typography className={classes.formControlLabel}>
            {label}
          </Typography>

          <FormControl
            className={classes.formControl}
            variant={variant}
          >
            <Select
              value={value}
              onChange={(event) => handleFormField.bind(comp)(name, event)}
              displayEmpty={true}
            >
              {this.renderMenuItems(menuItems)}
            </Select>
          </FormControl>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(FormSelectField);
