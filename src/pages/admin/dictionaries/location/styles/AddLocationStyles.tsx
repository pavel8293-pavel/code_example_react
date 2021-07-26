import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => createStyles({
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 20,
    boxSizing: 'border-box',
    padding: 20,
  },
  invalid: {
    color: 'red',
  },
  saveButton: {
    margin: '0 auto',
  },
  loadingWindow: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 200,
  },
}));

export default useStyles;