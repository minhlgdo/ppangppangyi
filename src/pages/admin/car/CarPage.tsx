import {ChangeEvent, useState} from 'react';
import AdminGeneralContextProvider from '@src/context/AdminGeneralContext.tsx';
import GeneralLayout from '@src/layout/admin/GeneralLayout.tsx';
import {Subjects} from '@src/common/constants.ts';
import {CAR_CREATE_PATH, CAR_MAIN_PATH} from '@src/common/navigation.ts';
import {useSuspenseQuery} from '@tanstack/react-query';
import {getCars} from '@src/api/admin-api.ts';
import {mapCars} from '@src/common/mapping-utils.ts';

function CarPageContent() {
  // Variables
  const [totalItems, setTotalItems] = useState('0');
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  // TODO: Load the real cars
  const {data: cars, isError} = useSuspenseQuery({
    queryKey: ['cars', page],
    queryFn: () => getCars(),
  });

  // convert cars
  const carOptions = mapCars(cars);

  const handleDeleteItem = (id: string) => {
    console.log(`Delete item ${id}`);
    // TODO: Call the items here
  };

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  return (
    <GeneralLayout
      subject={Subjects.Car}
      createPagePath={CAR_CREATE_PATH}
      totalItems={carOptions.length.toString()}
      items={carOptions}
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
      <CarPageContent />
    </AdminGeneralContextProvider>
  );
}
