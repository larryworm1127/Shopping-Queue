export const styles = theme => ({
  services_box: {
    display: 'flex',
    justifyContent: 'center',
    className: 'row'
  },
  iconWrapper: props => ({
    textAlign: 'center',
    margin: theme.spacing(3),
    padding: theme.spacing(3),
    borderRadius: '2px',
    borderStyle: 'solid',
    fontSize: '30',
    backgroundColor: 0x0000ff,
    align: 'center',
    color: props.color
  }),
  extraLargeButton: {
    fontSize: theme.typography.body1.fontSize,
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
  },
  button: {
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
  footerWrapper: {
    marginTop: theme.spacing(3),
    position: 'relative',
    backgroundImage: 'url(/main_bg.jpg)',
    backgroundSize: 'cover',
    paddingBottom: theme.spacing(2)
  },
  footerInner: {
    paddingTop: theme.spacing(8),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(6),
  },
  bigFont: {
    fontWeight: 400,
    color: theme.palette.common.white,
    textAlign: 'center'
  },
  paragraph: {
    fontWeight: 400,
    color: theme.palette.common.white
  },
  inputField: {
    backgroundColor: theme.palette.common.white,
    marginBottom: theme.spacing(1)
  },
  table: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(6),
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '95%',
  },
  messageGood: {
    color: 'green',
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'center'

  },
  messageBad: {
    color: 'red',
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'center'

  }
});
