import React, { useState, useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  TextField, Grid, Button, Select, MenuItem, FormControl, FormHelperText,
} from '@material-ui/core';
import clsx from 'clsx';
import schema from '../ValidationSchema';
import useStyles from '../styles/AddLocationStyles';
import Location from '../../../models/Location';
import Country from '../../../models/Country';
import locationService from '../../../services/main/location.service';
import CountryService from '../../../services/main/country.service';
import AreatroutMap from '../../map/map';
import coordinate from '../../map/mockMap';
import Loader from '../../loader/Loader';
import Toasters from '../../popUp/PopUp';
import { EmptyVoidFunction } from '../../../utils/types';

const defaultProps = {
  handleClose: () => {},
};

function AddLocationForm(props: {
    handleClose?: EmptyVoidFunction;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { handleClose } = props;
  const [countries, setCountries] = useState<Country[]>([]);
  const {
    control,
    setValue,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm<Location>({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      countryId: 0,
    },
  });
  const classes = useStyles();
  const [coords, setCoords] = useState<Array<number> | null>(
    coordinate || null,
  );
  const getCountries = async () => {
    setIsLoaded(true);
    const response = await CountryService.get();
    if (response) {
      setCountries(response);
    }
    setIsLoaded(false);
  };
  const setLocations = async (data: Location) => {
    setIsLoaded(true);
    const response = await locationService.post(data);
    if (response) {
      Toasters.success('Новая локация успешно добавлена');
    }
    if (handleClose) {
      handleClose();
    }
    setIsLoaded(false);
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if (coords) {
      setValue('latitude', coords[0]);
      setValue('longitude', coords[1]);
    }
  }, [coords]);

  if (isLoaded) {
    return (
      <Grid className={classes.loadingWindow}>
        <Loader />
      </Grid>
    );
  }
  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(setLocations)}
      className={classes.inputContainer}
    >
      <Controller
        render={({ field }) => (
          <TextField
            {...field}
            label="Название"
            variant="outlined"
            error={!!errors.name}
            helperText={errors?.name?.message}
            required
            autoFocus
          />
        )}
        name="name"
        control={control}
        defaultValue=""
      />
      <FormControl
        variant="outlined"
        fullWidth
        className="formControl"
      >
        <Controller
          name="countryId"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              variant="outlined"
              onChange={field.onChange}
              value={field.value}
              className={clsx('',
                {
                  [classes.invalid]: errors?.countryId,
                  '': !errors?.countryId,
                })}
            >
              <MenuItem
                key={0}
                value={0}
              >
                Выбрать страну
              </MenuItem>
              {countries && countries.map((country) => (
                <MenuItem key={country.id} value={country.id}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <FormHelperText className={classes.invalid}>
          {!!errors.countryId && 'Необходимо выбрать страну'}
        </FormHelperText>
      </FormControl>
      <Controller
        render={({ field }) => (
          <TextField
            {...field}
            label="Описание"
            variant="outlined"
            error={!!errors.description}
            helperText={errors?.description?.message}
            multiline
            required
          />
        )}
        name="description"
        control={control}
        defaultValue=""
      />
      <Controller
        render={({ field }) => (
          <TextField
            {...field}
            label="Широта"
            variant="outlined"
            multiline
            disabled
          />
        )}
        name="latitude"
        control={control}
        defaultValue={coords ? coords[0] : 0}
      />
      <Controller
        render={({ field }) => (
          <TextField
            {...field}
            label="Долгота"
            variant="outlined"
            multiline
            disabled
          />
        )}
        name="longitude"
        control={control}
        defaultValue={coords ? coords[1] : 0}
      />
      <AreatroutMap
        coordinate={coords}
        setCoords={setCoords}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.saveButton}
        disabled={!isDirty || !isValid}
      >
        Сохранить
      </Button>
    </form>
  );
}

export default AddLocationForm;

AddLocationForm.defaultProps = defaultProps;