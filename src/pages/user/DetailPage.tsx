import {useParams} from 'react-router-dom';
import {useSuspenseQuery} from '@tanstack/react-query';
import {getCar} from '@src/api/admin-api.ts';
import ErrorBoundaryWrapper from '@src/pages/ErrorBoundaryWrapper.tsx';
import {Suspense} from 'react';
import {Box, CircularProgress, List, ListItem, ListItemText, Typography} from '@mui/material';
import {mapRealImagePath} from '@src/common/mapping-utils.ts';

function DetailContent() {
  const {carId} = useParams();

  // Load the saved information
  const {data: carInfo} = useSuspenseQuery({
    queryKey: ['car', carId],
    queryFn: () => getCar(carId as string),
  });

  const imagePath = carInfo.imagePath !== '' ? mapRealImagePath(carInfo.imagePath!) : '/assets/react.svg';

  const DISPLAY_INFO = {
    fuels: carInfo.fuels?.map((fuel) => fuel.fuelName).join(', '),
    price: carInfo.price,
    fuelEfficiency: carInfo.fuelEfficiency ?? 'Not available',
    maxPower: carInfo.maxPower ?? 'Not available',
    torque: carInfo.torque ?? 'Not available',
    capacity: carInfo.capacity ?? 'Not available',
    engine: carInfo.engine ?? 'Not available',
    drivingSystem: carInfo.drivingSystem ?? 'Not available',
    transmission: carInfo.transmission ?? 'Not available',
    length: carInfo.length ?? 'Not available',
    height: carInfo.height ?? 'Not available',
    width: carInfo.width ?? 'Not available',
    wheelbase: carInfo.wheelbase ?? 'Not available',
  };

  type DisplayInfoKey = keyof typeof DISPLAY_INFO;

  const DISPLAY_TITLES: Record<DisplayInfoKey, string> = {
    fuels: '연료',
    price: '가격',
    fuelEfficiency: '연비',
    maxPower: '출력',
    torque: '토크',
    capacity: '배기',
    engine: '엔진',
    drivingSystem: '구동',
    transmission: '변속',
    length: '전장',
    height: '전고',
    width: '전폭',
    wheelbase: '축거',
  };

  return (
    <Box sx={{ml: 2, mr: 2, p: 2, marginTop: 4, display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
      <Box
        component="img"
        sx={{
          maxHeight: '300px',
          objectFit: 'contain',
        }}
        src={imagePath}
      />
      <Box>
        <Typography variant={'h4'}>
          {carInfo.brandName} {carInfo.modelName} {carInfo.launchedYear}
        </Typography>
        <List>
          {Object.entries(DISPLAY_INFO).map(([key, value]) => (
            <ListItem key={key}>
              <ListItemText primary={`${DISPLAY_TITLES[key as DisplayInfoKey]}: ${value}`} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default function DetailPage() {
  return (
    <ErrorBoundaryWrapper>
      <Suspense fallback={<CircularProgress />}>
        <DetailContent />
      </Suspense>
    </ErrorBoundaryWrapper>
  );
}
