import {Box, Button, Stack, TextField, Typography} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import {useState} from 'react';
import ResponseDialog from '../../components/admin/ResponseDialog.tsx';

const RESULT_ITEMS = ['수정이 완료되었습니다.', '수정이 실패되었습니다. 다시 시도하십시오.'];
type ResultItemType = (typeof RESULT_ITEMS)[number];

export default function EditBrandPage() {
  const {brandId} = useParams();
  const [brandName, setBrandName] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [result, setResult] = useState<ResultItemType>('');
  const navigate = useNavigate();

  // TODO: load brand name

  const onSaveClick = () => {
    // TODO: handle update call here
    // TODO: depending on the result value, show the response
    setOpenDialog(true);
    setResult(RESULT_ITEMS[0]);
  };
  const onCancelClick = () => {
    navigate(`/admin/brand`); // go back to the main page
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{m: 4, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 4}}>
      <Typography variant={'h4'}>Edit</Typography>
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
        text={result}
        handleClose={handleDialogClose}
      />
    </Box>
  );
}
