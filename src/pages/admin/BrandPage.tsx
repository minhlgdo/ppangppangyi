import {Box, Button, Stack, Typography} from '@mui/material';
import {useEffect, useState} from 'react';
import BrandList from '../../components/admin/BrandList.tsx';
import AdminBrandContextProvider, {useAdminBrand} from '../../context/AdminBrandContext.tsx';
import DeleteDialog from '../../components/admin/DeleteDialog.tsx';

function BrandPageContent() {
  const [totalItems, setTotalItems] = useState(0);
  const [brandList, setBrandList] = useState([
    {brandId: 1, brandName: 'Kia'},
    {brandId: 2, brandName: 'Hyundai'},
  ]);
  const {itemToDelete, setItemToDelete, deletePopup, setDeletePopup} = useAdminBrand();

  const handleClose = () => {
    setItemToDelete(undefined);
    setDeletePopup(false);
  };

  const handleDelete = () => {
    // handle delete item here
    handleClose();
  };

  return (
    <Box sx={{m: 4, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 4}}>
      {/*Header*/}
      <Stack
        direction={'row'}
        spacing={6}
      >
        <Typography variant={'h4'}>Brand</Typography>
        <Button variant={'contained'}>추가</Button>
      </Stack>
      <Typography>Total: {totalItems} brands</Typography>
      <BrandList brands={brandList} />
      <DeleteDialog
        isOpened={deletePopup}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    </Box>
  );
}

export default function BrandPage() {
  return (
    <AdminBrandContextProvider>
      <BrandPageContent />
    </AdminBrandContextProvider>
  );
}
