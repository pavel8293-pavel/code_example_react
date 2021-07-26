import { number, object, string } from 'yup';

const schema = object().shape({
  name: string().required('Название не должно быть пустым'),
  description: string().required('Описание не должно быть пустым'),
  countryId: number().required('Необходимо выбрать страну').moreThan(0),
});

export default schema;