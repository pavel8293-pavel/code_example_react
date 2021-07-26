import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Button, TextField, Box, Typography, Avatar, IconButton, FormControl, Select, InputLabel, MenuItem
} from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Close from '@material-ui/icons/Close';
import LocationService from '../../../services/main/location.service';
import CountryService from '../../../services/main/country.service';
import { getPrettyLatitudeFromCoords, getPrettyLongitudeFromCoords, getImageUrl } from '../../../utils/utils';
import Location from '../../../models/Location';
import ImageData from '../../../models/ImageData';
import UploadImage from '../../addImage/UploadImage';
import Map from '../../map/map';
import schema from './ValidationSchema';
import useStyles from './EditLocation.style';
import Toasters from '../../popUp/PopUp';
import LoaderFullScreen from '../../loader/LoaderFullScreen';
import ImageThumbnail from '../../imageThumbnail/ImageThumbnail';
import Routes from '../../../routing/routes';
import Country from '../../../models/Country';

export default function EditLocation() {
  const history = useHistory();
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { isDirty, isValid },
  } = useForm<Location>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [locationImages, setLocationImages] = useState<ImageData[]>([]);
  const [imageIds, setImageIds] = useState<number[]>([]);
  const [isImageChanged, setIsImageChanged] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [url, setUrl] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>();
  const [coords, setCoords] = useState<Array<number> | null>(null);
  const [isCoordsChanged, setIsCoordsChanged] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();

  const deleteImage = async (imageId: number) => {
    setIsLoaded(true);
    setLocationImages(locationImages.filter((item: any) => item.id !== imageId));
    setIsImageChanged(true);
    setIsLoaded(false);
  };

  const changeImageList = (image: ImageData) => {
    if (image) {
      setLocationImages((prev) => [...prev, image]);
    }
    setIsImageChanged(true);
  };

  useEffect(() => {
    const getRequestById = async () => {
      setIsLoaded(true);
      const response = await LocationService.getById(Number(id));
      setSelectedLocation(response);
      if (response && response.latitude && response.longitude) {
        setCoords([response.latitude, response.longitude]);
        setIsCoordsChanged(false);
      }
      if (response && response.images && response.images.length) {
        setLocationImages(response.images.map((image: any) => image));
      }
      setIsLoaded(false);
    };
    const getCountries = async () => {
      const response = await CountryService.get();
      if (response) {
        setCountries(response);
      }
    };
    getRequestById();
    getCountries();
  }, [id]);

  useEffect(() => {
    setValue('latitude', coords && getPrettyLatitudeFromCoords(coords));
    setValue('longitude', coords && getPrettyLongitudeFromCoords(coords));
  }, [coords, setValue]);

  useEffect(() => {
    setImageIds(locationImages.map((item) => item.id));
  }, [locationImages]);

  useEffect(() => {
    setValue('name', selectedLocation ? selectedLocation.name : '');
    setValue('description', selectedLocation ? selectedLocation.description : '');
  }, [selectedLocation, setValue]);

  useEffect(() => {
    setValue('images', imageIds);
  }, [setValue, locationImages, imageIds]);

  const sendPutRequest = async (data: Location) => {
    if (selectedLocation) {
      const result = { ...data };
      result.id = selectedLocation.id;
      const response = await LocationService.put(result);
      if (response) {
        Toasters.success('Изменения сохранены');
        history.push(Routes.AdminDictionaries.path);
      }
    }
  };

  const clickImageHandler = (link: string) => {
    setUrl(link);
    setOpen(true);
  };

  if (isLoaded) {
    return (<LoaderFullScreen />);
  }
  return (
    <form onSubmit={handleSubmit(sendPutRequest)}>
      <Typography align="center" variant="h5">
        Редактирование локации
      </Typography>
      <Box className={classes.contentWidth}>
        <Box m={1} p={1} className={classes.direction}>
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                id="filled-multiline-flexible"
                label="Название"
                rowsMax={4}
                variant="outlined"
                className={classes.contentInput}
                required
                autoFocus
              />
            )}
            name="name"
            control={control}
            defaultValue={selectedLocation ? selectedLocation.name : ''}
          />
          <FormControl variant="outlined">
            <InputLabel>Страна</InputLabel>
            <Controller
              name="countryId"
              control={control}
              defaultValue={selectedLocation?.country?.id}
              render={({ field }) => (
                <Select
                  {...field}
                  variant="outlined"
                  label="Страна"
                  value={field.value}
                  onChange={field.onChange}
                  className={classes.countrySelect}
                >
                  {countries?.map((country) => (
                    <MenuItem key={country.id} value={country.id}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                label="Описание"
                variant="outlined"
                rows="7"
                className={classes.contentInput}
                multiline
              />
            )}
            name="description"
            control={control}
            defaultValue={selectedLocation ? selectedLocation.description : ''}
          />
        </Box>
        <Box m={1} p={1} className={classes.contentMap}>
          <Box className={classes.contentWidth}>
            <TextField
              {...register('longitude')}
              label="Долгота"
              variant="outlined"
              className={classes.contentInput}
              inputProps={{ readOnly: true }}
              value={getPrettyLongitudeFromCoords(coords) || ''}
              required
            />
            <TextField
              {...register('latitude')}
              label="Широта"
              variant="outlined"
              className={classes.contentInput}
              inputProps={{ readOnly: true }}
              value={getPrettyLatitudeFromCoords(coords) || ''}
              required
            />
          </Box>
          <Map coordinate={coords} setCoords={setCoords} setIsCoordsChanged={setIsCoordsChanged} />
        </Box>
      </Box>
      {selectedLocation && locationImages.length
        ? (
          <>
            <Typography variant="h6" gutterBottom align="center">
              Фотографии локации
            </Typography>
            <Box className={classes.previewContainer}>
              {locationImages.map((image: any) => (
                <Box className={classes.previewImage} key={image.id}>
                  <Avatar
                    src={getImageUrl(image.url)}
                    className={classes.large}
                    variant="rounded"
                    onClick={() => clickImageHandler(image.url)}
                  />
                  <IconButton
                    onClick={() => deleteImage(image.id)}
                    className={classes.closeButton}
                    size="small"
                  >
                    <Close />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </>
        )
        : (
          <Typography variant="h6" gutterBottom align="center">
            Фотографий нет
          </Typography>
        )}
      <ImageThumbnail
        onClose={() => setOpen(false)}
        open={open}
        setOpen={setOpen}
        src={getImageUrl(url)}
      />
      <UploadImage changeImageList={changeImageList} />
      <Box mb={1} p={1} display="flex" justifyContent="flex-end" gridGap={20}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isDirty || (!isValid && !isImageChanged && !isCoordsChanged)}
        >
          Сохранить
        </Button>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => history.push(Routes.AdminDictionaries.path)}
        >
          Отменить
        </Button>
      </Box>
    </form>
  );
}