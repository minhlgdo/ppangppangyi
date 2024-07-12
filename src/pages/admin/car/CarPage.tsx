import {ChangeEvent, useState} from 'react';
import {Car, CarsType} from '@src/common/types.ts';
import AdminGeneralContextProvider from '@src/context/AdminGeneralContext.tsx';
import GeneralLayout from '@src/layout/admin/GeneralLayout.tsx';
import {Subjects} from '@src/common/constants.ts';
import {CAR_CREATE_PATH, CAR_MAIN_PATH} from '@src/common/navigation.ts';

const DUMMY_CARS: CarsType = [
  {
    carId: 1,
    brandId: 5,
    brandName: 'BMW',
    modelId: 1,
    modelName: 'X7',
    launchedYear: 2019,
  },
  {
    carId: 2,
    brandId: 5,
    brandName: 'BMW',
    modelId: 1,
    modelName: 'X7',
    launchedYear: 2020,
  },
];

function CarPageContent() {
  // Variables
  const [cars, setCars] = useState<CarsType>(DUMMY_CARS);
  const [totalItems, setTotalItems] = useState(DUMMY_CARS.length);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  // TODO: Load the real cars

  const handleDeleteItem = (id: number) => {
    console.log(`Delete item ${id}`);
    // TODO: Call the items here
  };

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  return (
    <GeneralLayout<Car>
      subject={Subjects.Car}
      createPagePath={CAR_CREATE_PATH}
      totalItems={totalItems}
      items={cars}
      itemKey={'carId'}
      itemPrimaryText={['brandName', 'modelName', 'launchedYear']}
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
