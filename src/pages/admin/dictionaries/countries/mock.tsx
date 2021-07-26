import faker from 'faker/locale/ru';

const mock = [
  {
    id: faker.datatype.number(),
    name: faker.random.words(),
  },
];

export default mock;