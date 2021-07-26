import React from 'react';
import {
  Button, TextField, Box, Grid,
} from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import CountryService from '../../services/main/country.service';
import Country from '../../models/Country';
import Toasters from '../popUp/PopUp';
import Loader from '../loader/Loader';
import useStyles from './Countries.style';
import { EmptyVoidFunction } from '../../utils/types';

const defaultProps = {
  handleClose: () => { },
};

export default function AddOrEditCountryModal(props: {
  selectedCountry: Country;
  handleClose?: EmptyVoidFunction;
}) {
  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<Country>({
    mode: 'onBlur',
  });
  const { selectedCountry, handleClose } = props;
  const classes = useStyles();
  const [isLoading, setIsLoading] = React.useState(false);

  const sendPostRequest = async (data: Country) => {
    setIsLoading(true);
    const response = await CountryService.post(data);
    if (response) {
      Toasters.success('Страна успешно добавлена');
    }
    if (handleClose) {
      handleClose();
    }
    setIsLoading(false);
  };

  const sendPutRequest = async (data: Country) => {
    setIsLoading(true);
    const result = { ...data };
    result.id = selectedCountry.id;
    const response = await CountryService.put(result);
    if (response) {
      Toasters.success('Страна успешно изменена');
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
    <form
      onSubmit={handleSubmit(
        selectedCountry.id ? sendPutRequest : sendPostRequest,
      )}
    >
      <Box m={2} p={1}>
        <Controller
          render={({ field }) => (
            <TextField
              {...field}
              id="filled-multiline-flexible"
              label="Название страны"
              rowsMax={4}
              variant="outlined"
              multiline
              required
              autoFocus
              className={classes.input}
            />
          )}
          name="name"
          control={control}
          defaultValue={selectedCountry.name}
        />
      </Box>
      <Box mb={1} p={1} display="flex" justifyContent="center">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isDirty || !isValid}
        >
          Сохранить
        </Button>
      </Box>
    </form>
  );
}

AddOrEditCountryModal.defaultProps = defaultProps;