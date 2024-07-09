import {Box, Pagination, Typography} from '@mui/material';
import React, {ChangeEvent, useEffect, useState} from 'react';
import BrandList from '@src/components/admin/BrandList.tsx';
import AdminBrandContextProvider, {useAdminBrand} from '@src/context/AdminBrandContext.tsx';
import DeleteDialog from '@src/components/admin/DeleteDialog.tsx';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {GET_BRANDS_ENDPOINT} from '@src/common/api.ts';
import {PageHeader} from '@src/components/admin/PageHeader.tsx';
import {AdminPageTypes} from '@src/common/common.ts';

function BrandPageContent() {
  const [totalItems, setTotalItems] = useState(0);
  const [brandList, setBrandList] = useState([]);
  const {itemToDelete, setItemToDelete, deletePopup, setDeletePopup} = useAdminBrand();
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const onCreateClick = () => {
    navigate('/admin/brand/create');
  };

  const handleClose = () => {
    setItemToDelete(undefined);
    setDeletePopup(false);
  };

  const handleDelete = () => {
    // handle delete item here
    handleClose();
  };

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(GET_BRANDS_ENDPOINT);
        const data = response.data;
        setBrandList(data.records);
        setTotalItems(data.totalRecordCount);
        setTotalPages(data.pageSize);
      } catch (error) {
        console.log('Error:', error);
      }
    })();
  }, [page]);

  return (
    <Box sx={{m: 4, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 4}}>
      <PageHeader
        text={'Brands'}
        onCreateClick={onCreateClick}
        pageType={AdminPageTypes.General}
      />
      <Typography>Total: {totalItems} brands</Typography>
      <BrandList brands={brandList} />
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color={'primary'}
      />
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
