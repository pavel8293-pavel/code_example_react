import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  uploadWrapper: {
    marginTop: '2%',
    height: '25vh',
    boxSizing: 'border-box',
    border: '1px #ccc solid',
    borderRadius: 7,
  },
  preview: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'auto',
  },
  emptyPreview: {
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
  },
  uploadForm: {
    width: '100%',
    height: '80%',
    alignItems: 'center',
  },
  inputUpload: {
    display: 'none',
  },
  uploadFormActive: {
    display: 'block',
    border: '4px dashed blue',
    opacity: '60%',
  },
  uploadArea: {
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
  },
  previewFooter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20%',
    marginTop: 5
  },
  saveImageButton: {
    [theme.breakpoints.down('xs')]: {
      transform: 'scale(0.75, 0.75)',
    },
  },
  imagePreview: {
    position: 'relative',
    height: '50%',
    margin: '1%',
  },
  imageWrapper: {
    height: '100%',
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
  root: {
    width: '100%',
  },
  loadingWindow: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '70vh',
  },
}));

export default useStyles;