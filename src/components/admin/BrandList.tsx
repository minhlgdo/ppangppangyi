import {Divider, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText} from '@mui/material';
import {DeleteRounded, Edit} from '@mui/icons-material';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useAdminBrand} from '@src/context/AdminBrandContext.tsx';

interface Brand {
  brandId: number;
  brandName: string;
}

interface BrandListProps {
  brands: Brand[];
}

function BrandList({brands}: BrandListProps) {
  const {setItemToDelete, setDeletePopup} = useAdminBrand();
  const navigate = useNavigate();
  const onBrandClick = (id: number) => {
    navigate(`/admin/brand/${id}`);
  };

  const onDeleteClick = (id: number) => {
    setItemToDelete(id);
    setDeletePopup(true);
  };

  // if (brands.length === 0) {
  //   return <Typography>Loading...</Typography>;
  // }

  return (
    <List>
      {brands.map((brand, index) => (
        <React.Fragment key={brand.brandId}>
          <ListItem>
            <ListItemText
              primary={brand.brandName}
              secondary={brand.brandId}
            />
            <ListItemSecondaryAction>
              {/*Edit*/}
              <IconButton
                style={{marginRight: 6}}
                aria-label={'edit'}
                onClick={() => onBrandClick(brand.brandId)}
              >
                <Edit />
              </IconButton>
              {/*Delete*/}
              <IconButton
                aria-label={'delete'}
                onClick={() => onDeleteClick(brand.brandId)}
              >
                <DeleteRounded />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          {index < brands.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
}

export default BrandList;
