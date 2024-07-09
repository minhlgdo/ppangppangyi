import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {CREATE_RESULT_ITEMS, CreateResultKey, RESPONSES, ResponseType} from '../../common/common.ts';
import {Box, Button, Stack, TextField, Typography} from '@mui/material';
import ResponseDialog from '../../components/admin/ResponseDialog.tsx';

const MAIN_BRAND_PAGE = `/admin/brand`;

export default function CreateBrandPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [result, setResult] = useState<ResponseType>('UNKNOWN');
  const navigate = useNavigate();

  const onSaveClick = () => {
    // TODO: Handle save result
    // TODO: Depending on the result, save the corresponding result
    setResult(RESPONSES[0]);
    setOpenDialog(true);
  };

  const onCancelClick = () => {
    navigate(MAIN_BRAND_PAGE); // go back to the main page
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    if (result === 'SUCCESS') {
      navigate(MAIN_BRAND_PAGE);
    }
  };

  const getMessage = (key: CreateResultKey): string => {
    return CREATE_RESULT_ITEMS[key];
  };

  return (
    <Box sx={{m: 4, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 4}}>
      <Typography variant={'h4'}>Create</Typography>
      <Stack
        direction={'row'}
        spacing={4}
        alignItems={'center'}
      >
        <Typography>Brand</Typography>
        <TextField
          required
          label={'필수'}
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
        text={getMessage(result as CreateResultKey)}
        handleClose={handleDialogClose}
      />
    </Box>
  );
}
