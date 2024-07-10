import {Subjects} from '@src/common/constants.ts';
import {FUEL_CREATE_PATH, FUEL_MAIN_PATH} from '@src/common/navigation.ts';
import React, {ChangeEvent, useState} from 'react';
import AdminContextProvider from '@src/context/AdminContext.tsx';
import GeneralLayout from '@src/layout/admin/GeneralLayout.tsx';
import {Fuel, FuelsType} from '@src/common/types.ts';

const DUMMY_FUELS: FuelsType = [
  {
    fuelId: 1,
    fuelName: '가솔린',
  },
  {
    fuelId: 2,
    fuelName: '디젤',
  },
  {
    fuelId: 3,
    fuelName: '전기',
  },
  {
    fuelId: 4,
    fuelName: '하이브리드',
  },
];

function FuelPageContent() {
  // Variables
  const [fuelList, setFuelList] = useState(DUMMY_FUELS);
  const [totalItems, setTotalItems] = useState(DUMMY_FUELS.length);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const handleDeleteItem = (id: number) => {
    console.log(`Delete item ${id}`);
    // TODO: Call the items here
  };

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  // TODO: Load the real fuel list here

  return (
    <GeneralLayout<Fuel>
      pageName={Subjects.Fuel}
      createPagePath={FUEL_CREATE_PATH}
      totalItems={totalItems}
      items={fuelList}
      itemKey={'fuelId'}
      itemPrimaryText={'fuelName'}
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
    <AdminContextProvider>
      <FuelPageContent />
    </AdminContextProvider>
  );
}
