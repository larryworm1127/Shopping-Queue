export const styles = theme => ({
  titleText: {
    marginTop: theme.spacing(5)
  },
  storesTable: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  table: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(6),
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '70%',
  },
  tableCellHead: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  tableCellCollapse: {
    paddingBottom: 0,
    paddingTop: 0
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
  replyTextField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
});
