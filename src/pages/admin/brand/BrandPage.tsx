import React, {ChangeEvent, useEffect, useState} from 'react';
import axios from 'axios';
import {GET_BRANDS_ENDPOINT} from '@src/common/api.ts';
import AdminContextProvider from '@src/context/AdminContext.tsx';
import GeneralLayout from '@src/layout/admin/GeneralLayout.tsx';
import {BRAND_CREATE_PATH, BRAND_MAIN_PATH} from '@src/common/navigation.ts';
import {PageNames} from '@src/common/constants.ts';

interface Brand {
  brandId: number;
  brandName: number;
}
type BrandsType = Brand[];

function BrandPageContent() {
  const [totalItems, setTotalItems] = useState(0);
  const [brandList, setBrandList] = useState<BrandsType>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const handleDeleteItem = (id: number) => {
    console.log(`Delete item ${id}`);
    // TODO: Call the items here
  };

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(GET_BRANDS_ENDPOINT);
        const data = response.data;
        setBrandList(data.records);
        setTotalItems(data.totalRecordCount);
        setTotalPages(data.pageSize);
      } catch (error) {
        console.log('Error:', error);
      }
    })();
  }, [page]);

  return (
    <GeneralLayout<Brand>
      pageName={PageNames.Brand}
      createPagePath={BRAND_CREATE_PATH}
      totalItems={totalItems}
      items={brandList}
      itemKey={'brandId'}
      itemPrimaryText={'brandName'}
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
    <AdminContextProvider>
      <BrandPageContent />
    </AdminContextProvider>
  );
}
