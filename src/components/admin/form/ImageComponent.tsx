import {Box} from '@mui/material';
import {useInputValues} from '@src/context/AdminCreateEditContext.tsx';
import {mapRealImagePath} from '@src/common/mapping-utils.ts';

export default function ImageComponent() {
  const {inputValues} = useInputValues();
  const imagePath = inputValues.imagePath ? mapRealImagePath(inputValues.imagePath as string) : '/assets/react.svg';

  console.log(`Input Image Path: ${inputValues.imagePath}`);
  console.log(`Mapped Image Path: ${imagePath}`);

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
      <Box
        component="img"
        sx={{
          width: '100%',
          maxHeight: '300px',
          objectFit: 'contain',
        }}
        src={imagePath}
      />
    </Box>
  );
}
