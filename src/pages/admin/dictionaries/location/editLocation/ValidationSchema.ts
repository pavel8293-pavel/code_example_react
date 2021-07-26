import {
  object, string, number, array, mixed,
} from 'yup';

const schema = object().shape({
  name: string().required(),
  description: string(),
  longitude: number().required(),
  latitude: number().required(),
  images: array().of(mixed()),
});

export default schema;