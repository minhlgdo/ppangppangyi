import React, {ChangeEvent, useState} from 'react';
import {getBrands} from '@src/api/admin-api.ts';
import AdminGeneralContextProvider from '@src/context/AdminGeneralContext.tsx';
import GeneralLayout from '@src/layout/admin/GeneralLayout.tsx';
import {BRAND_CREATE_PATH, BRAND_MAIN_PATH} from '@src/common/navigation.ts';
import {Subjects} from '@src/common/constants.ts';
import {useQuery} from '@tanstack/react-query';
import {mapBrands} from '@src/common/mapping-utils.ts';

function BrandPageContent() {
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const {
    data: brands,
    isError: isFetchingError,
    isLoading: isLoadingBrands,
  } = useQuery({
    queryKey: ['brands', page],
    queryFn: () => getBrands(),
    refetchInterval: 3000,
  });

  const brandOptions = brands ? mapBrands(brands) : [];

  const handleDeleteItem = (id: string) => {
    console.log(`Delete item ${id}`);
    // TODO: Call the items here
  };

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  return (
    <GeneralLayout
      subject={Subjects.Brand}
      createPagePath={BRAND_CREATE_PATH}
      totalItems={brandOptions.length.toString()}
      items={brandOptions}
      isLoadingItems={isLoadingBrands}
      isFetchingError={isFetchingError}
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
