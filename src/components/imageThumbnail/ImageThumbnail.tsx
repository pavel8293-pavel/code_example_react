import React from 'react';
import {
  IconButton, Dialog, Grid
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { EmptyVoidFunction } from '../../utils/types';
import useStyles from './style';

const defaultProps = {
  onClose: () => { },
};

export default function ImageThumbnail(props: {
  src: string;
  onClose?: EmptyVoidFunction;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    onClose, open, setOpen, src
  } = props;
  const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };
  return (
    <Dialog open={open} onClose={handleClose} className={classes.modal}>
      <Grid container direction="row">
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <img
          className={classes.image}
          src={src}
          alt="Предпросмотр изображения"
        />
      </Grid>
    </Dialog>
  );
}

ImageThumbnail.defaultProps = defaultProps;