import React from 'react';
import {Box, Grid} from '@mui/material';
import CarContentCard from './CarContentCard.tsx';

interface CarContentListParams {
  items: {carId: number; image: string; year: number; brandName: string; modelName: string}[];
}

const CarContentList: React.FC<CarContentListParams> = ({items}) => {
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
              id={item.carId}
              name={item.modelName}
              brand={item.brandName}
              year={item.year}
              imageSrc={item.image}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CarContentList;
