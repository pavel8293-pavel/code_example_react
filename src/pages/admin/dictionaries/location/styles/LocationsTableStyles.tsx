import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => createStyles({
  editWrapper: {
    justifyContent: 'center',
  },
  tableCell: {
    wordBreak: 'break-all',
    margin: '0 auto',
  },
  table: {
    boxSizing: 'border-box',
    padding: 20,
  },
  buttonCell: {
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  decription: {
    width: 600,
  },
  coordinateCell: {
    margin: '0 auto',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    minHeight: 20,
    maxHeight: 20,
    lineHeight: 20,
    whiteSpace: 'nowrap',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

export default useStyles;