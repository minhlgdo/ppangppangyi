import React, {ChangeEvent, useEffect, useState} from 'react';
import AdminGeneralContextProvider, {useDeleteResponse, useFetchError} from '@src/context/AdminGeneralContext.tsx';
import GeneralLayout from '@src/layout/admin/GeneralLayout.tsx';
import {ResponseTypes, Subjects} from '@src/common/constants.ts';
import {CAR_CREATE_PATH, CAR_MAIN_PATH} from '@src/common/navigation.ts';
import {keepPreviousData, useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {deleteCar, getCars} from '@src/api/admin-api.ts';
import {mapCars} from '@src/common/mapping-utils.ts';
import ErrorBoundaryWrapper from '@src/pages/ErrorBoundaryWrapper.tsx';

function CarPageContent() {
  // Variables
  const [page, setPage] = useState(1);
  const {setResponse} = useDeleteResponse();
  const {setFetchError} = useFetchError();

  // Load the real cars
  const {
    data: carsData,
    isLoading: isCarLoading,
    isError: isFetchingError,
  } = useQuery({
    queryKey: ['cars', page],
    queryFn: () => getCars(page),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    setFetchError(isFetchingError);
    // eslint-disable-next-line
  }, [isFetchingError]);

  const cars = carsData?.content;
  const totalItems = carsData?.page.totalElements ?? '0';
  const totalPages = carsData?.page.totalPages ?? 1;

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  // convert cars
  const carOptions = cars ? mapCars(cars) : [];

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (carId: string) => deleteCar(carId),
    onSuccess: () => {
      setResponse(ResponseTypes.Success);
      queryClient.invalidateQueries({queryKey: ['cars', page]});
    },
    onError: () => {
      setResponse(ResponseTypes.Failure);
    },
  });
  const handleDeleteItem = (id: string) => {
    mutation.mutate(id);
  };

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  return (
    <GeneralLayout
      subject={Subjects.Car}
      createPagePath={CAR_CREATE_PATH}
      totalItems={totalItems}
      items={carOptions}
      isLoadingItems={isCarLoading}
      basePagePath={CAR_MAIN_PATH}
      totalPages={totalPages}
      page={page}
      handlePageChange={handlePageChange}
      handleDeleteItem={handleDeleteItem}
    />
  );
}

export default function CarPage() {
  return (
    <AdminGeneralContextProvider>
      <ErrorBoundaryWrapper>
        <CarPageContent />
      </ErrorBoundaryWrapper>
    </AdminGeneralContextProvider>
  );
}
