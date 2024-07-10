import {FC} from 'react';
import {Divider, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Typography} from '@mui/material';
import React from 'react';
import {DeleteRounded, Edit} from '@mui/icons-material';
import {useAdminFuel} from '@src/context/AdminFuelContext.tsx';
import {useNavigate} from 'react-router-dom';
import {FUEL_MAIN_NAV} from '@src/common/navigation.ts';

interface Fuel {
  fuelId: number;
  fuelName: string;
}

interface FuelListProps {
  items: Fuel[];
}

const FuelList: FC<FuelListProps> = ({items}) => {
  const {setItemToDelete, setDeletePopup} = useAdminFuel();
  const navigate = useNavigate();

  const onEditClick = (id: number) => {
    navigate(FUEL_MAIN_NAV + `/${id}`);
  };

  const onDeleteClick = (id: number) => {
    setItemToDelete(id);
    setDeletePopup(true);
  };

  if (items.length === 0) {
    return <Typography>Loading...</Typography>;
  }
  return (
    <List>
      {items.map((fuel, index) => (
        <React.Fragment key={fuel.fuelId}>
          <ListItem>
            <ListItemText
              primary={fuel.fuelName}
              secondary={fuel.fuelId}
            />
            <ListItemSecondaryAction>
              {/*Edit*/}
              <IconButton
                style={{marginRight: 6}}
                aria-label={'edit'}
                onClick={() => onEditClick(fuel.fuelId)}
              >
                <Edit />
              </IconButton>
              {/*Delete*/}
              <IconButton
                aria-label={'delete'}
                onClick={() => onDeleteClick(fuel.fuelId)}
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
};

export default FuelList;
