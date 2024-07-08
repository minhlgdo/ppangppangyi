import React from 'react';
import {Box, Button, Card, CardActions, CardContent, CardMedia, Divider, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useCompare} from '../context/CompareContext.tsx';

interface CarContentCardParams {
  id: number;
  name: string;
  brand: string;
  year: number;
  imageSrc: string;
  // toCompare: boolean;
}

const CarContentCard: React.FC<CarContentCardParams> = ({id, name, brand, year, imageSrc}) => {
  const navigate = useNavigate();
  const {compareCars, handleAddCar, handleDeleteCar} = useCompare();
  const isCompared = compareCars.some((car) => car.carId === id);

  const onCardClick = () => {
    console.log(id);
    navigate(`/details/${id}`);
  };

  const onCompareClick = () => {
    console.log(`Car ${id} is clicked`);
    if (isCompared) {
      handleDeleteCar(id);
    } else {
      handleAddCar({id, imageSrc});
    }
  };

  return (
    <Card
    // sx={{maxWidth: 345}}
    >
      <CardMedia
        component={'img'}
        height={'200'}
        image={imageSrc}
      />
      <CardContent
        sx={{p: 2}}
        onClick={onCardClick}
      >
        <Box sx={{gap: 1}}>
          <Typography variant={'h5'}>{name}</Typography>
          <Box
            style={{display: 'flex', flexDirection: 'row'}}
            sx={{gap: 2}}
          >
            <Typography variant={'body1'}>{brand}</Typography>
            <Divider
              orientation={'vertical'}
              flexItem
            />
            <Typography variant={'body1'}>{year}</Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions sx={{p: 2}}>
        <Button
          sx={{width: 1}}
          variant={isCompared ? 'contained' : 'outlined'}
          onClick={() => onCompareClick()}
        >
          {isCompared ? '추가함' : '비교하기'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default CarContentCard;
