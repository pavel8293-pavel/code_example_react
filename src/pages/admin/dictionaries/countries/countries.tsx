import React, { useEffect, useState } from 'react';
import { List, Button, Grid } from '@material-ui/core';
import { AddCircleOutline } from '@material-ui/icons';
import Country from '../../models/Country';
import CountriesService from '../../services/main/country.service';
import AreatroutModal from '../modal/modal';
import AddOrEditCountryModal from './AddOrEditCountryModal';
import DeleteCountryModal from './DeleteCountryModal';
import AreatroutTable from '../areatrout-table';
import EditDeleteCell from './EditDeleteCell';
import LoaderFullScreen from '../loader/LoaderFullScreen';
import useStyles from './Countries.style';

function Countries() {
  const [allCountries, setCountries] = useState<Array<Country> | null>([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    name: '',
    id: 0,
  });
  const classes = useStyles();

  const columns = [
    {
      displayName: 'Название страны',
      fieldName: 'name',
    },
    {
      displayName: 'Управление',
      fieldName: 'action',
      allowSortring: false,
      allowSearch: false,
      render: (data: Country) => (
        <EditDeleteCell
          setSelectedCountry={setSelectedCountry}
          setOpenEdit={setOpenEdit}
          setOpenDelete={setOpenDelete}
          data={data}
        />
      ),
    },
  ];

  const getCountries = async () => {
    const response = await CountriesService.get();
    setCountries(response);
    setIsLoading(false);
  };

  useEffect(() => {
    getCountries();
  }, []);

  function handleAdd() {
    setOpenAdd(true);
    setSelectedCountry({ id: 0, name: '' });
  }

  if (isLoading) {
    return <LoaderFullScreen />;
  }
  return (
    <>
      <AreatroutModal
        header="Добавить страну"
        open={openAdd}
        setOpen={setOpenAdd}
        onClose={getCountries}
      >
        <AddOrEditCountryModal selectedCountry={selectedCountry} />
      </AreatroutModal>
      <AreatroutModal
        header="Удалить"
        open={openDelete}
        setOpen={setOpenDelete}
        onClose={getCountries}
      >
        <DeleteCountryModal countryId={selectedCountry.id} />
      </AreatroutModal>
      <AreatroutModal
        header="Редактировать"
        open={openEdit}
        setOpen={setOpenEdit}
        onClose={getCountries}
      >
        <AddOrEditCountryModal selectedCountry={selectedCountry} />
      </AreatroutModal>
      <Button
        data-testid="add-button"
        variant="contained"
        color="primary"
        startIcon={<AddCircleOutline />}
        onClick={handleAdd}
      >
        Добавить
      </Button>
      <Grid className={classes.tableWidth}>
        <List>
          {allCountries && allCountries.length ? (
            <AreatroutTable columns={columns} rows={allCountries} />
          ) : (
            <p>Страны еще не добавлены</p>
          )}
        </List>
      </Grid>
    </>
  );
}

export default Countries;