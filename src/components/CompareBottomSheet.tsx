import React from 'react';
import {useCompare} from '../context/CompareContext.tsx';
import {Box, Button, Drawer, Stack} from '@mui/material';
import CompareCarItem from './CompareCarItem.tsx';

// interface CompareBottomSheetParams {
//   compareItems: {carId: number; image: string}[];
// }

const CompareBottomSheet = () => {
  const {compareCars, handleResetList} = useCompare();
  const onCompareClick = () => {
    // only navigate to the compare page when the number of compared items are between 2 and 3
    if (compareCars.length >= 2 && compareCars.length <= 3) {
      handleResetList();
    } else {
    }
  };
  return (
    <Drawer
      anchor={'bottom'}
      open={compareCars.length > 0}
      variant={'persistent'}
    >
      <Box
        padding={4}
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}
      >
        {/*List of selected items*/}
        <Stack
          direction={'row'}
          spacing={2}
        >
          {compareCars.map((car) => (
            <CompareCarItem
              key={car.carId}
              id={car.carId}
              image={car.imageSrc}
            />
          ))}
        </Stack>
        <Button
          onClick={() => onCompareClick()}
          variant={'contained'}
        >
          비교하기
        </Button>
      </Box>
    </Drawer>
  );
};

export default CompareBottomSheet;
