import {Box, Typography} from '@mui/material';
import {RequiredFieldType} from '@src/common/types.ts';
import {useInputErrors, useInputValues} from '@src/context/AdminCreateEditContext.tsx';

interface ImageUploadComponentProps {
  field: RequiredFieldType;
}

export default function ImageComponent({field}: ImageUploadComponentProps) {
  const {inputValues} = useInputValues();
  const {inputErrors} = useInputErrors();

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
      <Typography color={'red'}>{inputErrors[field.name]}</Typography>
    </Box>
  );
}
