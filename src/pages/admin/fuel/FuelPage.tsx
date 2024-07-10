import {Box, Typography} from '@mui/material';
import {PageHeader} from '@src/components/admin/PageHeader.tsx';
import {AdminPageTypes} from '@src/common/constants.ts';
import {useNavigate} from 'react-router-dom';
import {FUEL_CREATE_NAV} from '@src/common/navigation.ts';
import React, {useState} from 'react';
import FuelList from '@src/components/admin/FuelList.tsx';
import AdminFuelContextProvider, {useAdminFuel} from '@src/context/AdminFuelContext.tsx';
import {useAdminBrand} from '@src/context/AdminBrandContext.tsx';
import DeleteDialog from '@src/components/admin/DeleteDialog.tsx';

const DUMMY_FUELS = [
  {
    fuelId: 1,
    fuelName: '가솔린',
  },
  {
    fuelId: 2,
    fuelName: '디젤',
  },
  {
    fuelId: 3,
    fuelName: '전기',
  },
  {
    fuelId: 4,
    fuelName: '하이브리드',
  },
];

function FuelPageContent() {
  const navigate = useNavigate();
  const onCreateClick = () => {
    navigate(FUEL_CREATE_NAV);
  };

  // Variables
  const [fuels, setFuels] = useState(DUMMY_FUELS);
  const [totalItems, setTotalItems] = useState(DUMMY_FUELS.length);
  const {itemToDelete, setItemToDelete, deletePopup, setDeletePopup} = useAdminFuel();

  const handleClose = () => {
    setItemToDelete(undefined);
    setDeletePopup(false);
  };

  const handleDelete = () => {
    // handle delete item here
    handleClose();
  };

  // TODO: Load the real fuel list here

  return (
    <Box sx={{m: 4, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 4}}>
      <PageHeader
        pageType={AdminPageTypes.General}
        text={'Fuel'}
        onCreateClick={onCreateClick}
      />
      <Typography>Total: {totalItems} fuels</Typography>
      <FuelList items={fuels} />
      <DeleteDialog
        isOpened={deletePopup}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    </Box>
  );
}

export default function FuelPage() {
  return (
    <AdminFuelContextProvider>
      <FuelPageContent />
    </AdminFuelContextProvider>
  );
}
