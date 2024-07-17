import {ResponseTypes, Subjects} from '@src/common/constants.ts';
import {FUEL_CREATE_PATH, FUEL_MAIN_PATH} from '@src/common/navigation.ts';
import React, {ChangeEvent, useState} from 'react';
import AdminGeneralContextProvider, {useDeleteResponse} from '@src/context/AdminGeneralContext.tsx';
import GeneralLayout from '@src/layout/admin/GeneralLayout.tsx';
import {mapFuels} from '@src/common/mapping-utils.ts';
import {keepPreviousData, useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {deleteFuel, getFuels} from '@src/api/admin-api.ts';

function FuelPageContent() {
  // Variables
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const {setResponse} = useDeleteResponse();

  const {
    data: fuelData,
    isLoading: isFetchingFuels,
    isError: isFetchingError,
  } = useQuery({
    queryKey: ['fuels', page],
    queryFn: () => getFuels(page),
    placeholderData: keepPreviousData,
  });

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
      isFetchingError={isFetchingError}
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
      <FuelPageContent />
    </AdminGeneralContextProvider>
  );
}
