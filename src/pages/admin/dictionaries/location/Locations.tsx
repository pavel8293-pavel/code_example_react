import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { AddCircleOutline } from '@material-ui/icons';
import locationService from '../../services/main/location.service';
import LocationData from '../../models/LocationData';
import useStyles from './styles/LocationsStyles';
import LocationsTable from './table/LocationsTable';
import AddLocation from './modals/AddLocation';
import AreatroutModal from '../modal/modal';
import DeleteLocationConfirm from './modals/DeleteLocationConfirm';
import LoaderFullScreen from '../loader/LoaderFullScreen';

function Locations() {
  const classes = useStyles();
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [locationsList, setLocationsList] = useState<LocationData[] | null>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [id, setId] = useState<number>(0);

  const getLocations = async () => {
    setIsLoaded(true);
    const locations = await locationService.get();
    setLocationsList(locations);
    setIsLoaded(false);
  };

  const addFormClose = (): void => {
    getLocations();
    setOpenAdd(false);
  };

  const deleteFormClose = (): void => {
    getLocations();
    setOpenDelete(false);
  };

  useEffect(() => {
    getLocations();
  }, []);

  if (isLoaded) {
    return (<LoaderFullScreen />);
  }
  return (
    <div className={classes.locationsWrapper}>
      <div className={classes.addButton}>
        <Button
          data-testid="add-button"
          color="primary"
          startIcon={<AddCircleOutline />}
          variant="contained"
          onClick={() => { setOpenAdd(true); }}
        >
          Добавить
        </Button>
      </div>
      <AreatroutModal
        header="Добавить локацию"
        open={openAdd}
        setOpen={setOpenAdd}
        className={classes.modalWide}
        onClose={addFormClose}
      >
        <AddLocation />
      </AreatroutModal>
      <AreatroutModal
        header="Удалить локацию"
        open={openDelete}
        setOpen={setOpenDelete}
        className={classes.modalWide}
        onClose={deleteFormClose}
      >
        <DeleteLocationConfirm id={id} />
      </AreatroutModal>
      <LocationsTable
        locationsList={locationsList}
        setOpenDelete={setOpenDelete}
        setId={setId}
      />
    </div>
  );
}

export default Locations;