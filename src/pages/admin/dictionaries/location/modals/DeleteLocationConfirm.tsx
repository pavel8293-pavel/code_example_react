import React, { useState } from 'react';
import {
  Button, Grid, DialogActions, DialogTitle,
} from '@material-ui/core';
import locationService from '../../../services/main/location.service';
import Toasters from '../../popUp/PopUp';
import Loader from '../../loader/Loader';
import useStyles from '../styles/LocationsStyles';
import { EmptyVoidFunction } from '../../../utils/types';

const defaultProps = {
  handleClose: () => {},
};

function DeleteLocationConfirm(props: {
    handleClose?: EmptyVoidFunction;
    id: number;
}) {
  const classes = useStyles();
  const { handleClose, id } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const deleteLocation = async () => {
    setIsLoaded(true);
    const response = await locationService.delete(id);
    if (response) {
      Toasters.success('Локация успешно удалена');
    }
    if (handleClose) {
      handleClose();
    }
    setIsLoaded(false);
  };

  if (isLoaded) {
    return (
      <Grid className={classes.loadingWindow}>
        <Loader />
      </Grid>
    );
  }
  return (
    <>
      <DialogTitle>Вы действительно хотите удалить данную локацию?</DialogTitle>
      <DialogActions className={classes.buttonsWrapper}>
        <Button
          onClick={handleClose}
          color="primary"
          variant="contained"
        >
          Oтмена
        </Button>
        <Button
          onClick={deleteLocation}
          color="primary"
          variant="contained"
          autoFocus
        >
          Удалить
        </Button>
      </DialogActions>
    </>
  );
}

export default DeleteLocationConfirm;

DeleteLocationConfirm.defaultProps = defaultProps;