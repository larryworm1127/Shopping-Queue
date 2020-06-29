export const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(4),
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  formControlLabel: {
    textTransform: 'uppercase',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    color: theme.palette.secondary.main
  },
  formControl: {
    width: '100%',
  },
});
