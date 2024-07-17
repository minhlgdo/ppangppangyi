import React, {ChangeEvent, useEffect, useState} from 'react';
import {deleteBrand, getBrands} from '@src/api/admin-api.ts';
import AdminGeneralContextProvider, {useDeleteResponse, useFetchError} from '@src/context/AdminGeneralContext.tsx';
import GeneralLayout from '@src/layout/admin/GeneralLayout.tsx';
import {BRAND_CREATE_PATH, BRAND_MAIN_PATH} from '@src/common/navigation.ts';
import {ResponseTypes, Subjects} from '@src/common/constants.ts';
import {keepPreviousData, useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {mapBrands} from '@src/common/mapping-utils.ts';

function BrandPageContent() {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const {setResponse} = useDeleteResponse();
  const {setFetchError} = useFetchError();

  const {
    data: brandData,
    isError: isFetchingError,
    isLoading: isLoadingBrands,
  } = useQuery({
    queryKey: ['brands', page],
    queryFn: () => getBrands(page),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    setFetchError(isFetchingError);
    // eslint-disable-next-line
  }, [isFetchingError]);

  const brands = brandData?.content;
  const totalPages = brandData?.page.totalPages ?? 1;
  const totalItems = brandData?.page.totalElements ?? '0';
  const brandOptions = brands ? mapBrands(brands) : [];

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const mutation = useMutation({
    mutationFn: (brandId: string) => deleteBrand(brandId),
    onSuccess: () => {
      setResponse(ResponseTypes.Success);
      queryClient.invalidateQueries({queryKey: ['brands', page]});
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
      subject={Subjects.Brand}
      createPagePath={BRAND_CREATE_PATH}
      totalItems={totalItems}
      items={brandOptions}
      isLoadingItems={isLoadingBrands}
      basePagePath={BRAND_MAIN_PATH}
      totalPages={totalPages}
      page={page}
      handlePageChange={handlePageChange}
      handleDeleteItem={handleDeleteItem}
    />
  );
}

export default function BrandPage() {
  return (
    <AdminGeneralContextProvider>
      <BrandPageContent />
    </AdminGeneralContextProvider>
  );
}
