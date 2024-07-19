import {CircularProgress, Pagination, Stack, Typography} from '@mui/material';
import CarContentList from '@src/components/user/CarContentList.tsx';
import Filter from '@src/components/user/Filter.tsx';
import React, {ChangeEvent, useState} from 'react';
import {CompareContextProvider} from '@src/context/CompareContext.tsx';
import CompareBottomSheet from '@src/components/user/CompareBottomSheet.tsx';
import {useSearchCategory} from '@src/context/HomeContext.tsx';
import HomeContextProvider from '@src/context/HomeContext.tsx';
import ErrorBoundaryWrapper from '@src/pages/ErrorBoundaryWrapper.tsx';
import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {getCarsUsingCategory} from '@src/api/user-api.ts';
import {CarsType} from '@src/common/types.ts';

function HomepageContent() {
  const {searchCategory} = useSearchCategory();
  const [page, setPage] = useState(1);

  // loading carlist here
  const {data: carsData, isLoading} = useQuery({
    queryKey: ['home-car-list', searchCategory, page],
    queryFn: () => getCarsUsingCategory(searchCategory, page),
    placeholderData: keepPreviousData,
  });

  const cars: CarsType = carsData?.content ?? [];
  const totalPages = carsData?.page.totalPages ?? 1;

  // @ts-ignore
  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  return (
    <Stack
      spacing={4}
      sx={{ml: 2, mr: 2, p: 2, marginTop: 4, marginBottom: 20}}
    >
      <Typography variant={'h4'}>오늘 어떤 모델을 찾고 계시나요?</Typography>
      <Filter />
      {isLoading ? <CircularProgress /> : <CarContentList items={cars} />}
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color={'primary'}
      />
      <CompareBottomSheet />
    </Stack>
  );
}

export default function Homepage() {
  return (
    <CompareContextProvider>
      <HomeContextProvider>
        <ErrorBoundaryWrapper>
          <HomepageContent />
        </ErrorBoundaryWrapper>
      </HomeContextProvider>
    </CompareContextProvider>
  );
}
