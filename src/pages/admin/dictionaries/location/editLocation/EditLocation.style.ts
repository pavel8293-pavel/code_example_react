import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => createStyles({
  contentInput: {
    marginBottom: 20,
    marginRight: 10,
  },
  contentWidth: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
    display: 'flex',
    flexDirection: 'row',
  },
  direction: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
  },
  contentMap: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    cursor: 'pointer'
  },
  previewImage: {
    position: 'relative',
    display: 'inline-block',
  },
  previewContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    padding: 10,
    border: '1px #ccc solid',
    borderRadius: 7,
    boxSizing: 'border-box',
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    opacity: 0.5,
    background: 'white',
    [theme.breakpoints.down('xs')]: {
      top: 0,
      right: 0,
      transform: 'scale(0.75, 0.75)',
    },
  },
  loadingWindow: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '70vh',
  },
  countrySelect: {
    margin: '0 10px 20px 0'
  }
}));

export default useStyles;