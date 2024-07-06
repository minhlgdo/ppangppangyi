import {Stack, Typography} from '@mui/material';
import CarContentList from '../components/CarContentList.tsx';
import Filter from '../components/Filter.tsx';
import {useState} from 'react';

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

export default function Homepage() {
  const [searchCategory, setSearchCategory] = useState('경형');
  const [carList, setCarList] = useState([]);

  return (
    <>
      <Stack
        spacing={2}
        sx={{m: 2, p: 2}}
      >
        <Typography variant={'h4'}>오늘 어떤 모델을 찾고 계시나요?</Typography>
        <Filter setSearchCategory={setSearchCategory} />
        <CarContentList items={dummyCarList} />
      </Stack>
    </>
  );
}
