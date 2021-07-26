import React from 'react';
import { ListItem, IconButton } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Routes from '../../../routing/routes';
import useStyles from '../styles/LocationsTableStyles';

function EditDeleteCell(props: {
    id: number
    setId: React.Dispatch<React.SetStateAction<number>>,
    setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { setId, id, setOpenDelete } = props;
  const classes = useStyles();
  const openDelModal = (locationId: number): void => {
    setId(locationId);
    setOpenDelete(true);
  };

  return (
    <ListItem className={classes.buttonCell}>
      <Link to={Routes.EditLocation.path.replace(':id', String(id))}>
        <IconButton
          edge="start"
          aria-label="edit"
        >
          <Edit />
        </IconButton>
      </Link>
      <IconButton
        edge="end"
        aria-label="delete"
        onClick={() => openDelModal(id)}
      >
        <Delete />
      </IconButton>
    </ListItem>
  );
}

export default EditDeleteCell;