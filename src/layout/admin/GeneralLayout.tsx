import {Box, Pagination, Typography} from '@mui/material';
import {PageHeader} from '@src/components/admin/PageHeader.tsx';
import {useNavigate} from 'react-router-dom';
import {AdminPageTypes, SubjectType} from '@src/common/constants.ts';
import React, {ChangeEvent} from 'react';
import ListItems from '@src/components/admin/ListItems.tsx';
import DeleteDialog from '@src/components/admin/DeleteDialog.tsx';
import {useAdminContext} from '@src/context/AdminGeneralContext.tsx';
import {SubjectOptions} from '@src/common/types.ts';

interface GeneralLayoutProps {
  subject: SubjectType;
  createPagePath: string;
  totalItems: string;
  items: SubjectOptions[];
  basePagePath: string;
  totalPages: number;
  page: number;
  handlePageChange: (event: ChangeEvent<unknown>, page: number) => void;
  handleDeleteItem: (id: string) => void;
}

export default function GeneralLayout({
  subject,
  createPagePath,
  totalItems,
  items,
  basePagePath,
  totalPages,
  page,
  handlePageChange,
  handleDeleteItem,
}: GeneralLayoutProps) {
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
    if (itemToDelete) {
      handleDeleteItem(itemToDelete);
    }
    handleClose();
  };

  return (
    <Box sx={{m: 4, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 4}}>
      <PageHeader
        subject={subject}
        onCreateClick={handleCreateClick}
        pageType={AdminPageTypes.General}
      />
      <Typography>Total: {totalItems} items</Typography>
      <ListItems
        items={items}
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
