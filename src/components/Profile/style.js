const drawerWidth = 240;
export const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  adminShopperProfileButton: {
    marginRight: theme.spacing(2)
  },
  button: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1)
  },
  deleteButton: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1),
    backgroundColor: 'red',
  },
  secondaryText: {
    flex: 1,
  },
});
