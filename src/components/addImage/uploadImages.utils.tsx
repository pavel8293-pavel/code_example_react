import Image from '../../models/addImage/Image';

const addIdProperty = (image: Image) => Object.defineProperty(image, 'id', {
  value: Math.floor(Math.random() * Date.now()),
  configurable: true,
  writable: true
});

export default addIdProperty;