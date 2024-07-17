import React from 'react';
import {Box, Grid, Typography} from '@mui/material';
import CarContentCard from './CarContentCard.tsx';
import {CarsType} from '@src/common/types.ts';

interface CarContentListProps {
  items: CarsType;
}

function CarContentList({items}: CarContentListProps) {
  if (items.length === 0) {
    return <Typography>데이터가 없습니다</Typography>;
  }

  return (
    <Box sx={{flexGrow: 1}}>
      <Grid
        container
        spacing={{xs: 2, md: 3}}
        columns={{xs: 4, sm: 8, md: 12}}
      >
        {items.map((item) => (
          <Grid
            item
            xs={2}
            sm={4}
            md={4}
            key={item.carId}
          >
            <CarContentCard
              id={item.carId!}
              name={item.modelName!}
              brand={item.brandName!}
              year={item.launchedYear}
              imageSrc={item.imagePath!}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CarContentList;
