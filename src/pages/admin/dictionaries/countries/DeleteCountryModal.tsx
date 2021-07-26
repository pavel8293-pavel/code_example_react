import React from 'react';
import {
  Button, Grid, DialogActions, DialogTitle,
} from '@material-ui/core';
import CountryService from '../../services/main/country.service';
import Toasters from '../popUp/PopUp';
import useStyles from './Countries.style';
import Loader from '../loader/Loader';
import { EmptyVoidFunction } from '../../utils/types';

const defaultProps = {
  handleClose: () => {},
};

export default function DeleteCountryModal(props: {
  countryId: number;
  handleClose?: EmptyVoidFunction;
}) {
  const { handleClose, countryId } = props;
  const classes = useStyles();
  const [isLoading, setIsLoading] = React.useState(false);

  const sendDeleteRequest = async () => {
    setIsLoading(true);
    if (countryId) {
      const response = await CountryService.delete(countryId);
      if (response) {
        Toasters.success('Страна успешно удалена');
      }
    }
    if (handleClose) {
      handleClose();
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <Grid className={classes.loadingWindow}>
        <Loader />
      </Grid>
    );
  }
  return (
    <>
      <DialogTitle>Вы действительно хотите удалить выбранную страну?</DialogTitle>
      <DialogActions className={classes.buttonsWrapper}>
        <Button
          onClick={handleClose}
          color="primary"
          variant="contained"
        >
          Oтмена
        </Button>
        <Button
          onClick={sendDeleteRequest}
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

DeleteCountryModal.defaultProps = defaultProps;