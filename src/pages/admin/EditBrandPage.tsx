import {Box, Button, Stack, TextField, Typography} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import {useState} from 'react';
import ResponseDialog from '@src/components/admin/ResponseDialog.tsx';
import {AdminPageTypes, EDIT_RESULT_ITEMS, EditResultKey, RESPONSES, ResponseType} from '@src/common/common.ts';
import {PageHeader} from '@src/components/admin/PageHeader.tsx';

export default function EditBrandPage() {
  const {brandId} = useParams();
  const [brandName, setBrandName] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [result, setResult] = useState<ResponseType>('UNKNOWN');
  const navigate = useNavigate();

  // TODO: load brand name

  const onSaveClick = () => {
    // TODO: handle update call here
    // TODO: depending on the result value, show the response
    setOpenDialog(true);
    setResult(RESPONSES[0]);
  };
  const onCancelClick = () => {
    navigate(`/admin/brand`); // go back to the main page
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const getMessage = (key: EditResultKey): string => {
    return EDIT_RESULT_ITEMS[key];
  };

  return (
    <Box sx={{m: 4, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 4}}>
      <PageHeader pageType={AdminPageTypes.Edit} />
      <Stack
        direction={'row'}
        spacing={4}
        alignItems={'center'}
      >
        <Typography>Brand</Typography>
        <TextField
          required
          label={'필수'}
          defaultValue={brandName}
        />
      </Stack>
      <Stack
        direction={'row'}
        spacing={2}
      >
        <Button
          variant={'contained'}
          onClick={onSaveClick}
        >
          저장
        </Button>
        <Button
          variant={'outlined'}
          onClick={onCancelClick}
        >
          취소
        </Button>
      </Stack>
      <ResponseDialog
        isOpened={openDialog}
        text={getMessage(result as EditResultKey)}
        handleClose={handleDialogClose}
      />
    </Box>
  );
}
