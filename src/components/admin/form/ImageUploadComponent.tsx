import {CloudUpload} from '@mui/icons-material';
import {Button, styled} from '@mui/material';

const VisuallyHiddenInput = styled('input')({
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function ImageUploadComponent() {
  return (
    <Button
      component={'label'}
      variant={'contained'}
      tabIndex={-1}
      startIcon={<CloudUpload />}
    >
      이미지 업로드
      <VisuallyHiddenInput type="image" />
    </Button>
  );
}
