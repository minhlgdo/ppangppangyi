import {ResponseTypes, Subjects} from '@src/common/constants.ts';
import {FUEL_CREATE_PATH, FUEL_MAIN_PATH} from '@src/common/navigation.ts';
import React, {ChangeEvent, useEffect, useState} from 'react';
import AdminGeneralContextProvider, {useDeleteResponse, useFetchError} from '@src/context/AdminGeneralContext.tsx';
import GeneralLayout from '@src/layout/admin/GeneralLayout.tsx';
import {mapFuels} from '@src/common/mapping-utils.ts';
import {keepPreviousData, useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {deleteFuel, getFuels} from '@src/api/admin-api.ts';
import ErrorBoundaryWrapper from '@src/pages/ErrorBoundaryWrapper.tsx';

function FuelPageContent() {
  // Variables
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const {setResponse} = useDeleteResponse();
  const {setFetchError} = useFetchError();

  const {
    data: fuelData,
    isLoading: isFetchingFuels,
    isError: isFetchingError,
  } = useQuery({
    queryKey: ['fuels', page],
    queryFn: () => getFuels(page),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    setFetchError(isFetchingError);
    // eslint-disable-next-line
  }, [isFetchingError]);

  const mutation = useMutation({
    mutationFn: (fuelId: string) => deleteFuel(fuelId),
    onSuccess: () => {
      setResponse(ResponseTypes.Success);
      queryClient.invalidateQueries({queryKey: ['fuels', page]});
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

  // TODO: Load the real fuel list here
  const fuels = fuelData?.content;
  const fuelOptions = fuels ? mapFuels(fuels) : [];
  const totalItems = fuelData?.page.totalElements ?? '0';
  const totalPages = fuelData?.page.totalPages ?? 1;

  return (
    <GeneralLayout
      subject={Subjects.Fuel}
      createPagePath={FUEL_CREATE_PATH}
      totalItems={totalItems}
      items={fuelOptions}
      isLoadingItems={isFetchingFuels}
      basePagePath={FUEL_MAIN_PATH}
      totalPages={totalPages}
      page={page}
      handlePageChange={handlePageChange}
      handleDeleteItem={handleDeleteItem}
    />
  );
}

export default function FuelPage() {
  return (
    <AdminGeneralContextProvider>
      <ErrorBoundaryWrapper>
        <FuelPageContent />
      </ErrorBoundaryWrapper>
    </AdminGeneralContextProvider>
  );
}
