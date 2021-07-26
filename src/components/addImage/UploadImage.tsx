import React, {
  useState, DragEvent, MouseEvent
} from 'react';
import { SaveAlt, GetApp, Close } from '@material-ui/icons';
import { Button, IconButton } from '@material-ui/core';
import Image from '../../models/addImage/Image';
import useStyles from './UploadImageStyles';
import ImageService from '../../services/main/images.service';
import LoaderFullScreen from '../loader/LoaderFullScreen';
import addIdProperty from './uploadImages.utils';

export default function UploadImage(props: {
  changeImageList: any;
}) {
  const { changeImageList } = props;
  const classes = useStyles();
  const [isDragged, setIsDragged] = useState<boolean>(false);
  const [images, setImages] = useState<Image[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const stopPerformance = (event: DragEvent | MouseEvent): void => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragIn = (event: DragEvent): void => {
    stopPerformance(event);
  };

  const handleDragOut = (event: DragEvent): void => {
    setIsDragged(false);
    stopPerformance(event);
  };

  const handleDrag = (event: DragEvent): void => {
    setIsDragged(true);
    stopPerformance(event);
  };

  const uploadImages = (imageList: FileList): void => {
    if (imageList) {
      const imagesArray = Array.from(imageList).map((image) => addIdProperty(image));
      setImages((prev) => prev.concat(imagesArray));
    }
  };

  const handleDrop = (event: DragEvent): void => {
    setIsDragged(false);
    uploadImages(event.dataTransfer.files);
    stopPerformance(event);
  };

  const deleteImage = (event: MouseEvent, index: number): void => {
    stopPerformance(event);
    const modifiedArray = [...images];
    modifiedArray.splice(index, 1);
    setImages(modifiedArray);
  };

  const postImages = async (event: any) => {
    stopPerformance(event);
    if (images.length) {
      images.forEach(async (item) => {
        const formData = new FormData();
        formData.append('image', item);
        setIsLoaded(true);
        const response = await ImageService.post(formData);
        if (response) {
          changeImageList(response);
        }
        setIsLoaded(false);
      });
    }
    setImages([]);
  };

  if (isLoaded) {
    return <LoaderFullScreen />;
  }
  return (
    <div className={classes.uploadWrapper}>
      <div
        id="form"
        className={`${classes.uploadForm} ${isDragged ? classes.uploadFormActive : ''}`}
      >
        <label
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          htmlFor="image_uploads"
        >
          <div className={classes.preview}>
            {images.length ? images.map((item, index) => (
              <div
                className={classes.imagePreview}
                key={item.id}
              >
                <img // eslint-disable-line
                  src={URL.createObjectURL(item)}
                  alt="Предпросмотр изображения"
                  className={classes.imageWrapper}
                  onClick={stopPerformance}
                />
                <IconButton
                  className={classes.closeButton}
                  onClick={(e) => deleteImage(e, index)}
                  size="small"
                  value={index}
                >
                  <Close />
                </IconButton>
              </div>
            ))
              : (
                <p
                  className={classes.emptyPreview}
                >
                  <GetApp fontSize="large" />
                  Нажмите на это поле, чтобы загрузить картинку
                </p>
              )}
          </div>
        </label>
        <input
          type="file"
          id="image_uploads"
          name="image_uploads"
          accept="image/*"
          onChange={(event: any) => uploadImages(event.target.files)}
          className={classes.inputUpload}
          multiple
        />
        <div className={classes.previewFooter}>
          {
            images.length ? (
              <Button
                onClick={postImages}
                color="inherit"
                variant="contained"
                type="submit"
                className={classes.saveImageButton}
              >
                <SaveAlt />
                Загрузить
              </Button>
            ) : ''
          }
        </div>
      </div>
    </div>
  );
}