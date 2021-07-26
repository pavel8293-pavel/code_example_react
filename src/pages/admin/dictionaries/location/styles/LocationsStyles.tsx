import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => createStyles({
  modalWide: {
    boxSizing: 'border-box',
    justifyContent: 'space-between',
  },
  addButton: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  head: {
    textAlign: 'center',
  },
  locationsWrapper: {
    maxWidth: 1600,
  },
  loadingWindow: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 200,
  },
  buttonsWrapper: {
    padding: 10
  }
}));

export default useStyles;