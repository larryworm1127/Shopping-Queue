export const styles = theme => ({
  iconWrapper: {
    textAlign: 'center',
    margin: theme.spacing(3),
    padding: theme.spacing(3),
    borderRadius: '2px',
    borderStyle: 'solid',
    fontSize: '30'
  },
  LargeButton: {
    fontSize: theme.typography.body1.fontSize,
  },
  extraLargeButton: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
  },
  Button: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
  },
  card: {
    boxShadow: theme.shadows[4],
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    padding: theme.spacing(6),
  },
  wrapper: {
    marginBottom: theme.spacing(6),
    position: 'relative',
    backgroundImage: 'url(/main_bg.jpg)',
    backgroundSize: 'cover',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(5)
  },
  footerwrapper: {
    marginTop: theme.spacing(3),
    position: 'relative',
    backgroundImage: 'url(/main_bg.jpg)',
    backgroundSize: 'cover',
    paddingBottom: theme.spacing(2)
  },
  containerFix: {
    maxWidth: 'none !important'
  },
  footerInner: {
    paddingTop: theme.spacing(8),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(6),
  },
  BigFont: {
    fontWeight: 400,
    color: theme.palette.common.white,
    textAlign: 'center'
  },
  paragraph: {
    fontWeight: 400,
    color: theme.palette.common.white
  },
  inputField: {
    backgroundColor: theme.palette.common.white
  }
});
