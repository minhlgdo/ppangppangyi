import ErrorBoundaryWrapper from '@src/pages/ErrorBoundaryWrapper.tsx';
import {CircularProgress, Pagination, Stack} from '@mui/material';
import KeywordSearchComponent from '@src/components/user/KeywordSearchComponent.tsx';
import {SearchContextProvider, useSearchInputValues} from '@src/context/SearchContext.tsx';
import {keepPreviousData, useQuery} from '@tanstack/react-query';
import React, {useState} from 'react';
import {getCarsUsingKeywords} from '@src/api/user-api.ts';
import {CarsType} from '@src/common/types.ts';
import CarContentList from '@src/components/user/CarContentList.tsx';

function SearchResultContent() {
  const {searchInput} = useSearchInputValues();
  const [page, setPage] = useState(1);

  // load search result here
  const {
    data: searchData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['search-car', {searchInput, page}],
    queryFn: () => getCarsUsingKeywords(searchInput, page),
    placeholderData: keepPreviousData,
    enabled: false,
    refetchOnWindowFocus: false,
  });

  const cars: CarsType = searchData?.content ?? [];
  const totalPages = searchData?.page.totalPages ?? 1;

  // @ts-ignore
  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
    setTimeout(() => {
      refetch();
    }, 0);
  };

  const handleSearch = () => {
    setPage(1); // reset page number
    setTimeout(() => {
      refetch();
    }, 0);
  };

  return (
    <Stack
      spacing={5}
      sx={{ml: 2, mr: 2, p: 2, marginTop: 4}}
    >
      <KeywordSearchComponent handleButtonClick={handleSearch} />
      {isLoading ? <CircularProgress /> : <CarContentList items={cars} />}
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color={'primary'}
      />
    </Stack>
  );
}

export default function SearchResultPage() {
  return (
    <SearchContextProvider>
      <ErrorBoundaryWrapper>
        <SearchResultContent />
      </ErrorBoundaryWrapper>
    </SearchContextProvider>
  );
}
