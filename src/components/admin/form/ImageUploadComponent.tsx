import {CloudUpload} from '@mui/icons-material';
import {Box, Button, styled, Typography} from '@mui/material';
import {RequiredFieldType} from '@src/common/types.ts';
import {useInputErrors, useInputValues} from '@src/context/AdminCreateEditContext.tsx';
import {ChangeEvent} from 'react';

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

interface ImageUploadComponentProps {
  field: RequiredFieldType;
  handleChange: (name: string, value: string | number | string[]) => void;
}

export default function ImageUploadComponent({field, handleChange}: ImageUploadComponentProps) {
  const {inputValues} = useInputValues();
  const {inputErrors} = useInputErrors();

  const handleImageSelection = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      handleChange(field.name, imageUrl); // TODO: Fix it later
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        p: 4,
        maxWidth: '400px',
        mx: 'auto',
      }}
    >
      {inputValues.imagePath && (
        <Box
          component="img"
          sx={{
            width: '100%',
            maxHeight: '300px',
            objectFit: 'contain',
          }}
          src={inputValues.imagePath as string}
        />
      )}
      <Button
        component={'label'}
        variant={'contained'}
        tabIndex={-1}
        startIcon={<CloudUpload />}
      >
        이미지 업로드
        <VisuallyHiddenInput
          type="file"
          accept="image/*"
          onChange={(e) => handleImageSelection(e)}
        />
      </Button>
      <Typography color={'red'}>{inputErrors[field.name]}</Typography>
    </Box>
  );
}
