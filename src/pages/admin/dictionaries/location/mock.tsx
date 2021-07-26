import faker from 'faker/locale/ru';

const mock = [
  {
    id: faker.datatype.number(),
    name: faker.random.words(),
    description: faker.random.words(),
    latitude: faker.datatype.number(),
    longitude: faker.datatype.number(),
    countryId: faker.datatype.number(),
    country: null,
    images: null
  },
];

export default mock;