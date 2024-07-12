import {BrandsType, CategoriesType, Category, Fuel, FuelsType, InputValuesType, RequiredFieldType} from '@src/common/types.ts';
import {AdminPageTypes, FieldTypes, PARENT_CATEGORIES, Subjects} from '@src/common/constants.ts';
import {useState} from 'react';
import CreateEditLayout from '@src/layout/admin/CreateEditLayout.tsx';

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

type DropdownSelectionTypes = Fuel | Category;

export default function CreateCarPage() {
  const [categories, setCategories] = useState<CategoriesType>([]);
  const [fuels, setFuels] = useState<FuelsType>(DUMMY_FUELS);

  // TODO: Load categories

  // TODO: Load fuels

  const REQUIRED_FIELDS: RequiredFieldType<DropdownSelectionTypes>[] = [
    {
      name: 'brandName',
      label: '브랜드',
      required: true,
      type: FieldTypes.Text,
    },
    {
      name: 'modelName',
      label: '모델',
      required: true,
      type: FieldTypes.Text,
    },
    {
      name: 'launchedYear',
      label: '출시녀도',
      required: true,
      type: FieldTypes.Number,
    },
    {
      name: 'fuelId',
      label: '연류',
      required: true,
      type: FieldTypes.Dropdown,
      selections: fuels,
      selectionIndex: 'fuelId',
      selectionLabel: 'fuelName',
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

  // TODO: Handle sending data
  const handleSendData = (data: InputValuesType) => {
    // Test input data
    console.log(data);
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
