import React from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

const defaultProps = {
  setIsCoordsChanged: null,
};

interface Coordinates {
  coordinate: Array<number> | null;
  setCoords: React.Dispatch<React.SetStateAction<number[] | null>>;
  setIsCoordsChanged?: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultCoords = [53.902287, 27.561824];

const AreatroutMap = ({ coordinate, setCoords, setIsCoordsChanged }: Coordinates) => {
  const mapData = {
    center: coordinate || defaultCoords,
    zoom: 12,
  };

  function onMapClick(event: any) {
    setCoords(event.get('coords'));
    if (setIsCoordsChanged) {
      setIsCoordsChanged(true);
    }
  }

  return (
    <YMaps enterprise query={{ apikey: process.env.REACT_APP_YANDEX_MAP_KEY }}>
      <Map defaultState={mapData} width="100%" onClick={onMapClick}>
        {coordinate && <Placemark geometry={coordinate} />}
      </Map>
    </YMaps>
  );
};

export default AreatroutMap;

AreatroutMap.defaultProps = defaultProps;