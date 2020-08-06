export const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: '55%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(4),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: '130px',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  titleText: {
    marginTop: theme.spacing(5)
  },
  paperStats: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  container: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
  },
  secondaryText: {
    flex: 1,
  },
});
