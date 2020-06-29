import React from 'react';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { uid } from 'react-uid';

class FormSelectField extends React.Component {

  renderMenuItems(items) {
    return items.map((item, index) => (
      <MenuItem
        value={index}
        key={uid(item)}
      >
        {item}
      </MenuItem>
    ))
  }

  render() {
    const {
      name,
      label,
      formControlLabelClass,
      formControlClass,
      value,
      variant,
      handleFormField,
      menuItems
    } = this.props

    return (
      <Grid item xs={12}>
        <Typography className={formControlLabelClass}>
          {label}
        </Typography>

        <FormControl
          className={formControlClass}
          variant={variant}
        >
          <Select
            value={value}
            onChange={(event) => {
              handleFormField(name, event);
            }}
            displayEmpty={true}
          >
            {this.renderMenuItems(menuItems)}
          </Select>
        </FormControl>
      </Grid>
    );
  }
}
export default FormSelectField;
