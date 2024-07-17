import {Car, InputValuesType, RequiredFieldType} from '@src/common/types.ts';
import {AdminPageTypes, FieldTypes, ResponseTypes, Subjects} from '@src/common/constants.ts';
import CreateEditLayout from '@src/layout/admin/CreateEditLayout.tsx';
import AdminCreateEditProvider, {useDialogOpen, useInputValues, useResponseType} from '@src/context/AdminCreateEditContext.tsx';
import {mapBrands, mapExtendedCategories, mapFuels, mapModels, mapParentCategoryNames} from '@src/common/mapping-utils.ts';
import {useMutation, useSuspenseQuery} from '@tanstack/react-query';
import {createCar, getAllBrands, getAllCategories, getFuels, getModelsByBrand} from '@src/api/admin-api.ts';
import {useEffect} from 'react';
import ErrorBoundaryWrapper from '@src/pages/ErrorBoundaryWrapper.tsx';

function CreateCarPageContent() {
  const {inputValues} = useInputValues();
  const selectedBrandId = inputValues.brandId;
  const {setResponseType} = useResponseType();
  const {setDialogOpen} = useDialogOpen();

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

  // Load actual brands
  const {data: brands, isError: brandsError} = useSuspenseQuery({
    queryKey: ['all-brands'],
    queryFn: () => getAllBrands(),
  });

  // Load the models from the selected brands
  const {data: models, isError: modelsError} = useSuspenseQuery({
    queryKey: ['all-models', selectedBrandId],
    queryFn: () => (selectedBrandId ? getModelsByBrand(selectedBrandId as string) : []),
  });

  useEffect(() => {
    if (categoriesError || fuelsError || brandsError || modelsError) {
      setDialogOpen(true);
      setResponseType(ResponseTypes.Unknown);
    } else {
      setDialogOpen(false);
    }
    // eslint-disable-next-line
  }, [categoriesError, fuelsError, brandsError, modelsError]);

  // Map the parent's category name for display
  const fullCategoryMapping = mapParentCategoryNames(categories, categories).filter((category) => category.parentCategoryId !== null);
  const categoryOptions = mapExtendedCategories(fullCategoryMapping);

  const brandOptions = mapBrands(brands);

  const modelOptions = mapModels(models);

  const fuelOptions = mapFuels(fuelsData.content);

  const REQUIRED_FIELDS: RequiredFieldType[] = [
    {
      name: 'categoryId',
      label: '분류',
      required: true,
      type: FieldTypes.Autocomplete,
      options: categoryOptions,
    },
    {
      name: 'brandId',
      label: '브랜드',
      required: true,
      type: FieldTypes.Autocomplete,
      options: brandOptions,
    },
    {
      name: 'modelId',
      label: '모델',
      required: true,
      type: FieldTypes.Autocomplete,
      options: modelOptions,
    },
    {
      name: 'launchedYear',
      label: '출시년도',
      required: true,
      type: FieldTypes.Number,
    },
    {
      name: 'fuelId',
      label: '연료',
      required: true,
      type: FieldTypes.Dropdown,
      multipleOptions: true,
      options: fuelOptions,
    },
    {
      name: 'price',
      label: '가격',
      required: true,
      type: FieldTypes.Text,
    },
    {
      name: 'fuelEfficiency',
      label: '연비',
      required: false,
      type: FieldTypes.Text,
    },
    {
      name: 'maxPower',
      label: '출력',
      required: false,
      type: FieldTypes.Text,
    },
    {
      name: 'torque',
      label: '토크',
      required: false,
      type: FieldTypes.Text,
    },
    {
      name: 'capacity',
      label: '배기',
      required: false,
      type: FieldTypes.Text,
    },
    {
      name: 'engine',
      label: '엔진',
      required: false,
      type: FieldTypes.Text,
    },
    {
      name: 'drivingSystem',
      label: '구동',
      required: false,
      type: FieldTypes.Text,
    },
    {
      name: 'transmission',
      label: '변속',
      required: false,
      type: FieldTypes.Text,
    },
    {
      name: 'length',
      label: '전장',
      required: false,
      type: FieldTypes.Text,
    },
    {
      name: 'height',
      label: '전고',
      required: false,
      type: FieldTypes.Text,
    },
    {
      name: 'width',
      label: '전폭',
      required: false,
      type: FieldTypes.Text,
    },
    {
      name: 'wheelbase',
      label: '축거',
      required: false,
      type: FieldTypes.Text,
    },
  ];

  const mutation = useMutation({
    mutationFn: (car: Car) => createCar(car),
    onSuccess: () => {
      console.log('success');
      setResponseType(ResponseTypes.Success);
    },
    onError: () => {
      setResponseType(ResponseTypes.Failure);
    },
    onSettled: () => {
      setDialogOpen(true);
    },
  });

  // TODO: Handle sending data (using useMutation())
  const handleSendData = (data: InputValuesType) => {
    // Test input data
    console.log(data);
    const car: Car = {
      imagePath: '',
      categoryId: data.categoryId as string,
      modelId: data.modelId as string,
      fuelId: data.fuelId as string[],
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
      view={AdminPageTypes.Create}
      handleSendData={handleSendData}
    />
  );
}

export default function CreateCarPage() {
  return (
    <AdminCreateEditProvider>
      <ErrorBoundaryWrapper>
        <CreateCarPageContent />
      </ErrorBoundaryWrapper>
    </AdminCreateEditProvider>
  );
}
