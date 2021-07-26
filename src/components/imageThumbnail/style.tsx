import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => createStyles({
  closeButton: {
    position: 'absolute',
    marginLeft: 'auto',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
    height: 50,
  },
  image: {
    maxWidth: '100%',
    maxHeight: '90vh',
  },
  modal: {
    '& .MuiDialog-paperWidthSm': {
      maxWidth: 1000
    },
  }
}));

export default useStyles;