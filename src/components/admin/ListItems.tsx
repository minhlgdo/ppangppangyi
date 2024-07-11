import {useNavigate} from 'react-router-dom';
import {Divider, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText} from '@mui/material';
import React from 'react';
import {DeleteRounded, Edit} from '@mui/icons-material';
import {useAdminContext} from '@src/context/AdminContext.tsx';

interface ListProps<T> {
  items: T[];
  itemKey: keyof T;
  itemPrimaryText: Array<keyof T>;
  // itemSecondaryText?: Array<keyof T>;
  baseItemUrl: string;
}

export default function ListItems<T>({items, itemKey, itemPrimaryText, baseItemUrl}: ListProps<T>) {
  const navigate = useNavigate();
  const {setItemToDelete, setDeletePopup} = useAdminContext();

  const handleEditClick = (id: T[keyof T]) => {
    navigate(`${baseItemUrl}/${id}`);
  };

  const handleDeleteClick = (id: T[keyof T]) => {
    setItemToDelete(id as number);
    setDeletePopup(true);
  };

  return (
    <List>
      {items.map((item, index) => (
        <React.Fragment key={item[itemKey] as number}>
          <ListItem>
            <ListItemText
              primary={`${itemPrimaryText.map((key) => item[key]).join(' ')}`}
              secondary={item[itemKey] as string}
            />
            <ListItemSecondaryAction>
              {/*    Edit*/}
              <IconButton
                style={{marginRight: 6}}
                aria-label={'edit'}
                onClick={() => handleEditClick(item[itemKey])}
              >
                <Edit />
              </IconButton>
              {/*Delete*/}
              <IconButton
                aria-label={'delete'}
                onClick={() => handleDeleteClick(item[itemKey])}
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
