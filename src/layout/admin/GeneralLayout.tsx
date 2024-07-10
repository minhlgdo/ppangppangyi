import {Box, Pagination, Typography} from '@mui/material';
import {PageHeader} from '@src/components/admin/PageHeader.tsx';
import {useNavigate} from 'react-router-dom';
import {AdminPageTypes} from '@src/common/constants.ts';
import React, {ChangeEvent} from 'react';
import ListItems from '@src/components/admin/ListItems.tsx';
import DeleteDialog from '@src/components/admin/DeleteDialog.tsx';
import {useAdminContext} from '@src/context/AdminContext.tsx';

interface GeneralLayoutProps<T> {
  pageName: string;
  createPagePath: string;
  totalItems: number;
  items: T[];
  itemKey: keyof T;
  itemPrimaryText: keyof T;
  itemSecondaryText?: keyof T;
  basePagePath: string;
  totalPages: number;
  page: number;
  handlePageChange: (event: ChangeEvent<unknown>, page: number) => void;
  handleDeleteItem: (id: number) => void;
  // handleDeleteItem: () => {};
}

export default function GeneralLayout<T>({
  pageName,
  createPagePath,
  totalItems,
  items,
  itemKey,
  itemPrimaryText,
  itemSecondaryText,
  basePagePath,
  totalPages,
  page,
  handlePageChange,
  handleDeleteItem,
}: GeneralLayoutProps<T>) {
  const navigate = useNavigate();
  const {itemToDelete, setItemToDelete, deletePopup, setDeletePopup} = useAdminContext();

  const handleCreateClick = () => {
    navigate(createPagePath);
  };

  const handleClose = () => {
    setItemToDelete(undefined);
    setDeletePopup(false);
  };

  const handleDelete = async () => {
    // call handle delete from the main page?!
    if (typeof itemToDelete === 'number') {
      handleDeleteItem(itemToDelete);
    }
    handleClose();
  };

  return (
    <Box sx={{m: 4, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 4}}>
      <PageHeader
        text={pageName}
        onCreateClick={handleCreateClick}
        pageType={AdminPageTypes.General}
      />
      <Typography>Total: {totalItems} items</Typography>
      <ListItems
        items={items}
        itemKey={itemKey}
        itemPrimaryText={itemPrimaryText}
        itemSecondaryText={itemSecondaryText}
        baseItemUrl={basePagePath}
      />
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
