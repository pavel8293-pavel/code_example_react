import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  buttonCell: {
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  button: {
    [theme.breakpoints.down('sm')]: {
      width: 30,
      height: 30,
    },
  },
  loadingWindow: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 200,
    width: 200,
  },
  tableWidth: {
    maxWidth: 800,
  },
  input: {
    width: '100%'
  },
  buttonsWrapper: {
    padding: 10
  }
}));

export default useStyles;