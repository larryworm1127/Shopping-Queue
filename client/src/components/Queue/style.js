export const styles = theme => ({
  header: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    textAlign: 'center'
  },
  button: {
    backgroundColor: 'red'
  },
  queueList: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  queueRow: {
    marginBottom: '5px',
    fontSize: '150%',
    '& th': {
      fontSize: '0.75em',
      color: 'darkslategray'
    },
    backgroundColor: theme.palette.action.hover
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  tableCellCollapse: {
    paddingBottom: 0,
    paddingTop: 0
  },
  tableCellHead: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  tableCellBody: {
    fontSize: 14
  },
});
