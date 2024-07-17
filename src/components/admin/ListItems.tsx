import {useNavigate} from 'react-router-dom';
import {Divider, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText} from '@mui/material';
import React from 'react';
import {DeleteRounded, Edit} from '@mui/icons-material';
import {useAdminContext} from '@src/context/AdminGeneralContext.tsx';
import {SubjectOptions} from '@src/common/types.ts';

interface ListProps {
  items: SubjectOptions[];
  baseItemUrl: string;
}

export default function ListItems({items, baseItemUrl}: ListProps) {
  const navigate = useNavigate();
  const {setItemToDelete, setDeletePopup} = useAdminContext();

  const handleEditClick = (id: string) => {
    navigate(`${baseItemUrl}/${id}`);
  };

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setDeletePopup(true);
  };

  return (
    <List>
      {items.map((item, index) => (
        <React.Fragment key={item.key}>
          <ListItem key={item.key}>
            <ListItemText
              primary={item.name}
              secondary={`ID: ${item.key}`}
            />
            <ListItemSecondaryAction>
              {/*    Edit*/}
              <IconButton
                style={{marginRight: 6}}
                aria-label={'edit'}
                onClick={() => handleEditClick(item.key!)}
              >
                <Edit />
              </IconButton>
              {/*Delete*/}
              <IconButton
                aria-label={'delete'}
                onClick={() => handleDeleteClick(item.key!)}
              >
                <DeleteRounded />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          {index < items.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
}
