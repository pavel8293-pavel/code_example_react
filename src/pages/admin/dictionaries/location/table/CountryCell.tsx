import React from 'react';
import useStyles from '../styles/LocationsTableStyles';
import LocationData from '../../../models/LocationData';

const CountryCell = (props: {
    data: LocationData | undefined,
}) => {
  const classes = useStyles();
  const { data } = props;

  return (
    <p className={classes.tableCell}>
      {data?.country?.name || 'Не доступно' }
    </p>
  );
};

export default CountryCell;