import React from 'react';
import { ListItem, IconButton } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import Country from '../../models/Country';
import useStyles from './Countries.style';

function EditDeleteCell(props: {
  data: Country;
  setSelectedCountry: React.Dispatch<React.SetStateAction<Country>>;
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const classes = useStyles();
  const {
    data, setSelectedCountry, setOpenEdit, setOpenDelete,
  } = props;

  const editCountry = (country: Country) => {
    setSelectedCountry(country);
    setOpenEdit(true);
  };

  const openDelModal = (country: Country) => {
    setSelectedCountry(country);
    setOpenDelete(true);
  };
  return (
    <ListItem className={classes.buttonCell}>
      <IconButton
        className={classes.button}
        onClick={() => editCountry(data)}
        edge="start"
        aria-label="edit"
      >
        <Edit />
      </IconButton>
      <IconButton
        className={classes.button}
        edge="end"
        aria-label="delete"
        onClick={() => openDelModal(data)}
      >
        <Delete />
      </IconButton>
    </ListItem>
  );
}

export default EditDeleteCell;