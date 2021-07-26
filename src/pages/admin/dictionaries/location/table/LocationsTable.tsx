import React from 'react';
import LocationData from '../../../models/LocationData';
import AreatroutTable from '../../areatrout-table';
import EditDeleteCell from './EditDeleteCell';
import CoordinateCell from './CoordinateCell';
import CountryCell from './CountryCell';
import useStyles from '../styles/LocationsTableStyles';

function LocationsTable(props: {
  locationsList: LocationData[] | null;
  setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { locationsList, setOpenDelete, setId } = props;
  const classes = useStyles();

  const columns = [
    {
      displayName: 'Название локации',
      fieldName: 'name',
    },
    {
      displayName: 'Описание',
      fieldName: 'description',
      allowSearch: false,
      allowSortring: false,
      render: ({ description }: LocationData) => (
        <div className={classes.decription}>{description}</div>
      ),
    },
    {
      displayName: 'Страна',
      fieldName: 'countryId',
      render: (data: LocationData) => <CountryCell data={data} />,
    },
    {
      displayName: 'Координаты',
      fieldName: 'longitude',
      allowSearch: false,
      allowSortring: false,
      render: (data: LocationData) => <CoordinateCell data={data} />,
    },
    {
      displayName: 'Управление',
      fieldName: 'action',
      allowSearch: false,
      allowSortring: false,
      render: ({ id }: LocationData) => (
        <EditDeleteCell
          setId={setId}
          setOpenDelete={setOpenDelete}
          id={id}
        />
      ),
    },
  ];

  return (
    <>
      {locationsList && locationsList.length ? (
        <AreatroutTable columns={columns} rows={locationsList} />
      ) : (
        <p>Локации отсутствуют</p>
      )}
    </>
  );
}

export default LocationsTable;