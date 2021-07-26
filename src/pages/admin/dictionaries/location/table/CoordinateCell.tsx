import React from 'react';
import LocationData from '../../../models/LocationData';
import { getPrettyGeoValue } from '../../../utils/utils';
import useStyles from '../styles/LocationsTableStyles';

function CoordinateCell(props: {
    data: LocationData,
}) {
  const { data } = props;
  const classes = useStyles();

  return (
    <a
      href={`https://yandex.com/maps/?ll=${data.longitude},${data.latitude}&mode=whatshere
      &whatshere[point]=${data.longitude},${data.latitude}&whatshere[zoom]=11.8&z=13`}
      target="_blank"
      className={classes.coordinateCell}
      rel="noreferrer"
    >
      { getPrettyGeoValue(data.latitude) }
      ,
      { getPrettyGeoValue(data.longitude) }
    </a>
  );
}

export default CoordinateCell;