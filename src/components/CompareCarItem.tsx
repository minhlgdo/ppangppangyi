import React from 'react';
import {Button, Card, CardActions, CardMedia} from '@mui/material';
import {useCompare} from '../context/CompareContext.tsx';

interface CompareCarComponentParams {
  id: number;
  image: string;
}

const CompareCarItem: React.FC<CompareCarComponentParams> = ({id, image}) => {
  const {handleDeleteCar} = useCompare();
  return (
    <Card>
      <CardMedia
        component={'img'}
        width={80}
        height={60}
        image={image}
      />
      <CardActions>
        <Button
          size={'small'}
          onClick={() => handleDeleteCar(id)}
        >
          삭제
        </Button>
      </CardActions>
    </Card>
  );
};

export default CompareCarItem;
