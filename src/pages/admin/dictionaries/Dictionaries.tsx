import React from 'react';
import Locations from '../../../components/location/Locations';
import Countries from '../../../components/countries/countries';
import TabsContainer from '../../../components/tabsContainer/TabsContainer';

const Dictionaries = () => {
  const dictionariesData = [
    {
      name: 'Локации',
      component: <Locations />,
    },
    {
      name: 'Страны',
      component: <Countries />,
    }
  ];

  return (
    <TabsContainer data={dictionariesData} />
  );
};

export default Dictionaries;