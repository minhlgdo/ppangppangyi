import {Button, Stack} from '@mui/material';

interface SaveComponentProps {
  onSave: () => void;
  onCancel: () => void;
}

function SaveComponent({onSave, onCancel}: SaveComponentProps) {
  return (
    <Stack
      direction={'row'}
      spacing={2}
    >
      <Button
        variant={'contained'}
        onClick={onSave}
      >
        저장
      </Button>
      <Button
        variant={'outlined'}
        onClick={onCancel}
      >
        취소
      </Button>
    </Stack>
  );
}

export default SaveComponent;
