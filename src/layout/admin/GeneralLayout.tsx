import {Box, CircularProgress, Pagination, Typography} from '@mui/material';
import {PageHeader} from '@src/components/admin/PageHeader.tsx';
import {useNavigate} from 'react-router-dom';
import {AdminPageTypes, DELETE_RESULT_ITEMS, ResponseTypes, SubjectType} from '@src/common/constants.ts';
import React, {ChangeEvent} from 'react';
import ListItems from '@src/components/admin/ListItems.tsx';
import DeleteDialog from '@src/components/admin/DeleteDialog.tsx';
import {useAdminContext, useDeleteResponse, useFetchError} from '@src/context/AdminGeneralContext.tsx';
import {SubjectOptions} from '@src/common/types.ts';
import ResponseDialog from '@src/components/admin/ResponseDialog.tsx';

interface GeneralLayoutProps {
  subject: SubjectType;
  createPagePath: string;
  totalItems: string;
  items: SubjectOptions[];
  isLoadingItems: boolean;
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
  isLoadingItems,
  basePagePath,
  totalPages,
  page,
  handlePageChange,
  handleDeleteItem,
}: GeneralLayoutProps) {
  const navigate = useNavigate();
  const {itemToDelete, setItemToDelete, deletePopup, setDeletePopup} = useAdminContext();
  const {response, setResponse} = useDeleteResponse();
  const {fetchError, setFetchError} = useFetchError();

  const handleCreateClick = () => {
    navigate(createPagePath);
  };

  const handleDeleteDialogClose = () => {
    setItemToDelete(undefined);
    setDeletePopup(false);
  };

  const handleDelete = () => {
    // call handle delete from the main page?!
    if (itemToDelete) {
      handleDeleteItem(itemToDelete);
      handleDeleteDialogClose();
    } else {
      handleDeleteDialogClose();
    }
  };

  const handleResponseDialogClose = () => {
    setResponse(ResponseTypes.Unknown);
    setFetchError(false);
  };

  const getMessage = (): string => {
    if (fetchError) {
      return '데이터 조회가 실패합니다. 다시 시도하십시오.';
    }
    return DELETE_RESULT_ITEMS[response];
  };

  return (
    <Box sx={{m: 4, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 4}}>
      <PageHeader
        subject={subject}
        onCreateClick={handleCreateClick}
        pageType={AdminPageTypes.General}
      />
      <Typography>Total: {totalItems} items</Typography>
      {isLoadingItems ? (
        <CircularProgress />
      ) : (
        <ListItems
          items={items}
          baseItemUrl={basePagePath}
        />
      )}
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color={'primary'}
      />
      <DeleteDialog
        isOpened={deletePopup}
        handleClose={handleDeleteDialogClose}
        handleDelete={handleDelete}
      />
      <ResponseDialog
        isOpened={fetchError || response !== ResponseTypes.Unknown}
        text={getMessage()}
        handleClose={handleResponseDialogClose}
      />
    </Box>
  );
}
