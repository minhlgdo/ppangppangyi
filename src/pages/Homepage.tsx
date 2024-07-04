import {Box} from '@mui/material';
import CarContentList from '../components/CarContentList.tsx';

export default function Homepage() {
  const dummyCarList = [
    {
      carId: 1,
      image: 'src/assets/react.svg',
      year: 2024,
      brandName: 'Kia',
      modelName: 'Morning',
    },
    {
      carId: 2,
      image: 'src/assets/react.svg',
      year: 2023,
      brandName: 'Hyundai',
      modelName: 'IONIQ 5',
    },
    {
      carId: 3,
      image: 'src/assets/react.svg',
      year: 2024,
      brandName: 'Hyundai',
      modelName: 'IONIQ 6',
    },
  ];

  return (
    <>
      <Box sx={{m: 2}}>
        <CarContentList items={dummyCarList} />
      </Box>
    </>
  );
}
