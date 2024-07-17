import {Car, InputValuesType, RequiredFieldType} from '@src/common/types.ts';
import AdminCreateEditProvider, {useDialogOpen, useResponseType} from '@src/context/AdminCreateEditContext.tsx';
import {mapExtendedCategories, mapFuels, mapParentCategoryNames} from '@src/common/mapping-utils.ts';
import {AdminPageTypes, FieldTypes, ResponseTypes, Subjects} from '@src/common/constants.ts';
import CreateEditLayout from '@src/layout/admin/CreateEditLayout.tsx';
import {useParams} from 'react-router-dom';
import {useMutation, useSuspenseQuery} from '@tanstack/react-query';
import {editCar, getAllCategories, getCar, getFuels} from '@src/api/admin-api.ts';
import ErrorBoundaryWrapper from '@src/pages/ErrorBoundaryWrapper.tsx';
import {useEffect} from 'react';

function EditCarPageContent() {
  const {carId} = useParams();
  const {setResponseType} = useResponseType();
  const {setDialogOpen} = useDialogOpen();

  // Load the saved information
  const {data: carInfo, isError: carInfoError} = useSuspenseQuery({
    queryKey: ['car', carId],
    queryFn: () => getCar(carId as string),
  });

  // Load categories
  const {data: categories, isError: categoriesError} = useSuspenseQuery({
    queryKey: ['all-categories'],
    queryFn: () => getAllCategories(),
  });

  // Load actual fuels
  const {data: fuelsData, isError: fuelsError} = useSuspenseQuery({
    queryKey: ['all-fuels'],
    queryFn: () => getFuels(1), // currently there is only one page
  });

  useEffect(() => {
    if (categoriesError || fuelsError || carInfoError) {
      setDialogOpen(true);
      setResponseType(ResponseTypes.Unknown);
    } else {
      setDialogOpen(false);
    }
    // eslint-disable-next-line
  }, [categoriesError, fuelsError, carInfoError]);

  // Map the parent's category name for display
  const fullCategoryMapping = mapParentCategoryNames(categories, categories).filter((category) => category.parentCategoryId !== null);
  const categoryOptions = mapExtendedCategories(fullCategoryMapping);
  const fuelOptions = mapFuels(fuelsData.content);
  const selectedFuels = mapFuels(carInfo.fuels!);

  const REQUIRED_FIELDS: RequiredFieldType[] = [
    {
      name: 'imagePath',
      label: '이미지',
      required: true,
      type: FieldTypes.Image,
      defaultValue: carInfo?.imagePath,
    },
    {
      name: 'categoryId',
      label: '분류',
      required: true,
      disable: true,
      type: FieldTypes.Autocomplete,
      options: categoryOptions,
      defaultValue: carInfo?.categoryId,
    },
    {
      name: 'brandName',
      label: '브랜드',
      required: true,
      disable: true,
      type: FieldTypes.Text,
      defaultValue: carInfo?.brandName,
    },
    {
      name: 'modelId',
      label: '모델',
      required: true,
      disable: true,
      type: FieldTypes.Text,
      defaultValue: carInfo?.modelName,
    },
    {
      name: 'launchedYear',
      label: '출시년도',
      required: true,
      type: FieldTypes.Number,
      defaultValue: carInfo?.launchedYear,
    },
    {
      name: 'fuelId',
      label: '연료',
      required: true,
      type: FieldTypes.Dropdown,
      multipleOptions: true,
      options: fuelOptions,
      defaultValue: selectedFuels,
    },
    {
      name: 'price',
      label: '가격',
      required: true,
      type: FieldTypes.Text,
      defaultValue: carInfo?.price,
    },
    {
      name: 'fuelEfficiency',
      label: '연비',
      required: false,
      type: FieldTypes.Text,
      defaultValue: carInfo?.fuelEfficiency,
    },
    {
      name: 'maxPower',
      label: '출력',
      required: false,
      type: FieldTypes.Text,
      defaultValue: carInfo?.maxPower,
    },
    {
      name: 'torque',
      label: '토크',
      required: false,
      type: FieldTypes.Text,
      defaultValue: carInfo?.torque,
    },
    {
      name: 'capacity',
      label: '배기',
      required: false,
      type: FieldTypes.Text,
      defaultValue: carInfo?.capacity,
    },
    {
      name: 'engine',
      label: '엔진',
      required: false,
      type: FieldTypes.Text,
      defaultValue: carInfo?.engine,
    },
    {
      name: 'drivingSystem',
      label: '구동',
      required: false,
      type: FieldTypes.Text,
      defaultValue: carInfo?.drivingSystem,
    },
    {
      name: 'transmission',
      label: '변속',
      required: false,
      type: FieldTypes.Text,
      defaultValue: carInfo?.transmission,
    },
    {
      name: 'length',
      label: '전장',
      required: false,
      type: FieldTypes.Text,
      defaultValue: carInfo?.length,
    },
    {
      name: 'height',
      label: '전고',
      required: false,
      type: FieldTypes.Text,
      defaultValue: carInfo?.height,
    },
    {
      name: 'width',
      label: '전폭',
      required: false,
      type: FieldTypes.Text,
      defaultValue: carInfo?.width,
    },
    {
      name: 'wheelbase',
      label: '축거',
      required: false,
      type: FieldTypes.Text,
      defaultValue: carInfo?.wheelbase,
    },
  ];

  const mutation = useMutation({
    mutationFn: (car: Car) => editCar(carId!, car),
    onSuccess: () => {
      setResponseType(ResponseTypes.Success);
    },
    onError: () => {
      setResponseType(ResponseTypes.Failure);
    },
    onSettled: () => {
      setDialogOpen(true);
    },
  });

  // Handle sending data
  const handleSendData = (data: InputValuesType) => {
    // Test input data
    console.log(data);
    const car: Car = {
      imagePath: data.imagePath as string,
      categoryId: data.categoryId as string,
      modelId: data.modelId as string,
      launchedYear: data.launchedYear as string,
      price: data.price as string,
      fuelEfficiency: data.fuelEfficiency ? (data.fuelEfficiency as string) : '',
      maxPower: data.maxPower ? (data.maxPower as string) : '',
      torque: data.torque ? (data.torque as string) : '',
      capacity: data.capacity ? (data.capacity as string) : '',
      engine: data.engine ? (data.engine as string) : '',
      drivingSystem: data.drivingSystem ? (data.drivingSystem as string) : '',
      transmission: data.transmission ? (data.transmission as string) : '',
      length: data.length ? (data.length as string) : '',
      height: data.height ? (data.height as string) : '',
      width: data.width ? (data.width as string) : '',
      wheelbase: data.wheelbase ? (data.wheelbase as string) : '',
    };
    mutation.mutate(car);
  };

  return (
    <CreateEditLayout
      subject={Subjects.Car}
      requiredFields={REQUIRED_FIELDS}
      view={AdminPageTypes.Edit}
      handleSendData={handleSendData}
    />
  );
}

export default function EditCarPage() {
  return (
    <AdminCreateEditProvider>
      <ErrorBoundaryWrapper>
        <EditCarPageContent />
      </ErrorBoundaryWrapper>
    </AdminCreateEditProvider>
  );
}
