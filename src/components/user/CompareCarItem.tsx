import React from 'react';
import {Button, Card, CardActions, CardMedia} from '@mui/material';
import {useCompare} from '@src/context/CompareContext.tsx';
import {mapRealImagePath} from '@src/common/mapping-utils.ts';

interface CompareCarComponentProps {
  id: string;
  image: string;
}

function CompareCarItem({id, image}: CompareCarComponentProps) {
  const {handleDeleteCar} = useCompare();
  const imagePath = image !== '' ? mapRealImagePath(image) : '/assets/react.svg';
  return (
    <Card>
      <CardMedia
        component={'img'}
        width={80}
        height={60}
        image={imagePath}
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
}

export default CompareCarItem;
