import {FC} from 'react';
import {Divider, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText} from '@mui/material';
import {DeleteRounded, Edit} from '@mui/icons-material';
import React from 'react';

interface Brand {
  brandId: number;
  brandName: string;
}

interface BrandListProps {
  brands: Brand[];
}

const BrandList: FC<BrandListProps> = ({brands}) => {
  return (
    <List>
      {brands.map((brand, index) => (
        <React.Fragment key={brand.brandId}>
          <ListItem>
            <ListItemText primary={brand.brandName} />
            <ListItemSecondaryAction>
              {/*Edit*/}
              <IconButton
                style={{marginRight: 6}}
                aria-label={'edit'}
              >
                <Edit />
              </IconButton>
              {/*Delete*/}
              <IconButton aria-label={'delete'}>
                <DeleteRounded />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          {index < brands.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default BrandList;
