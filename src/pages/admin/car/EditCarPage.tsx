import {
  Brand,
  BrandsType,
  CategoriesType,
  ExtendedCategory,
  Fuel,
  FuelsType,
  InputValuesType,
  Model,
  ModelsType,
  RequiredFieldType,
} from '@src/common/types.ts';
import AdminCreateEditProvider, {useInputValues} from '@src/context/AdminCreateEditContext.tsx';
import {mapParentCategoryNames} from '@src/common/mapping-utils.ts';
import {AdminPageTypes, FieldTypes, Subjects} from '@src/common/constants.ts';
import CreateEditLayout from '@src/layout/admin/CreateEditLayout.tsx';
import {useParams} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import {getBrands, getCar} from '@src/api/admin-api.ts';

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

const DUMMY_CATEGORIES: CategoriesType = [
  {
    parentId: null,
    categoryId: 1,
    categoryName: '경형',
  },
  {
    parentId: null,
    categoryId: 2,
    categoryName: '대형',
  },
  {
    parentId: null,
    categoryId: 3,
    categoryName: '소형',
  },
  {
    parentId: null,
    categoryId: 4,
    categoryName: '스포츠카',
  },
  {
    parentId: null,
    categoryId: 5,
    categoryName: '준대형',
  },
  {
    parentId: null,
    categoryId: 6,
    categoryName: '준중형',
  },
  {
    parentId: null,
    categoryId: 7,
    categoryName: '중형',
  },
  {
    parentId: 1,
    categoryId: 8,
    categoryName: 'RV',
  },
  {
    parentId: 1,
    categoryId: 9,
    categoryName: 'SUV',
  },
  {
    parentId: 1,
    categoryId: 10,
    categoryName: '밴',
  },
];

const DUMMY_MODELS: ModelsType = [
  {
    modelId: 1,
    modelName: 'X1',
    brandName: 'BMW',
  },
  {
    modelId: 2,
    modelName: '아이오닉',
    brandName: 'Hyundai',
  },
  {
    modelId: 3,
    modelName: 'porsche',
    brandName: 'Porsche',
  },
];

type DropdownSelectionTypes = Fuel | ExtendedCategory | Brand | Model;

const DUMMY_BRANDS: BrandsType = [
  {
    brandId: 1,
    brandName: 'Hyundai',
  },
  {
    brandId: 2,
    brandName: 'Kia',
  },
  {
    brandId: 3,
    brandName: 'Audi',
  },
  {
    brandId: 4,
    brandName: 'Porsche',
  },
  {
    brandId: 5,
    brandName: 'BMW',
  },
];

function EditCarPageContent() {
  const {carId} = useParams();
  const fuels = DUMMY_FUELS;
  const {inputValues} = useInputValues();

  // TODO: Load the saved information
  const {
    data: carInfo,
    isLoading: carInfoLoading,
    isError: carInfoError,
  } = useQuery({
    queryKey: ['EDIT_CAR_CAR_INFO', carId],
    queryFn: () => getCar(carId as string),
  });

  // TODO: Load categories

  // TODO: Load actual fuels

  // TODO: Load actual brands

  // TODO: Load the models from the selected brands

  // Map the parent's category name for display
  const fullCategoryMapping = mapParentCategoryNames(DUMMY_CATEGORIES);
  const categorySelection = fullCategoryMapping.filter((category) => category.parentId !== null);

  const REQUIRED_FIELDS: RequiredFieldType<DropdownSelectionTypes>[] = [
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
      type: FieldTypes.Autocomplete,
      selections: categorySelection,
      selectionIndex: 'categoryId',
      selectionLabel: ['parentCategoryName', 'categoryName'],
      defaultValue: carInfo?.categoryId,
    },
    {
      name: 'brandId',
      label: '브랜드',
      required: true,
      type: FieldTypes.Autocomplete,
      selections: DUMMY_BRANDS,
      selectionIndex: 'brandId',
      selectionLabel: ['brandName'],
      defaultValue: carInfo?.brandId,
    },
    {
      name: 'modelId',
      label: '모델',
      required: true,
      type: FieldTypes.Autocomplete,
      selections: DUMMY_MODELS,
      selectionIndex: 'modelId',
      selectionLabel: ['modelName'],
      defaultValue: carInfo?.modelId,
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
      selections: fuels,
      selectionIndex: 'fuelId',
      selectionLabel: ['fuelName'],
      // defaultValue: carInfo?.fuels, // TODO: solve the type later
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

  // TODO: Handle sending data (using useMutation())
  const handleSendData = (data: InputValuesType) => {
    // Test input data
    console.log(data);
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
      <EditCarPageContent />
    </AdminCreateEditProvider>
  );
}
