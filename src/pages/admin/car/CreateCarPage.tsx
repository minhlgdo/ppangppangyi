import {BrandsType, CategoriesType, FuelsType, InputValuesType, ModelsType, RequiredFieldType, SubjectOptions} from '@src/common/types.ts';
import {AdminPageTypes, FieldTypes, Subjects} from '@src/common/constants.ts';
import CreateEditLayout from '@src/layout/admin/CreateEditLayout.tsx';
import AdminCreateEditProvider, {useInputValues} from '@src/context/AdminCreateEditContext.tsx';
import {mapParentCategoryNames} from '@src/common/mapping-utils.ts';
import {useQuery, useSuspenseQuery} from '@tanstack/react-query';
import {getBrands} from '@src/api/admin-api.ts';

const DUMMY_FUELS: FuelsType = [
  {
    fuelId: '1',
    fuelName: '가솔린',
  },
  {
    fuelId: '2',
    fuelName: '디젤',
  },
  {
    fuelId: '3',
    fuelName: '전기',
  },
  {
    fuelId: '4',
    fuelName: '하이브리드',
  },
];

const DUMMY_CATEGORIES: CategoriesType = [
  {
    parentId: null,
    categoryId: '1',
    categoryName: '경형',
  },
  {
    parentId: null,
    categoryId: '2',
    categoryName: '대형',
  },
  {
    parentId: null,
    categoryId: '3',
    categoryName: '소형',
  },
  {
    parentId: null,
    categoryId: '4',
    categoryName: '스포츠카',
  },
  {
    parentId: null,
    categoryId: '5',
    categoryName: '준대형',
  },
  {
    parentId: null,
    categoryId: '6',
    categoryName: '준중형',
  },
  {
    parentId: null,
    categoryId: '7',
    categoryName: '중형',
  },
  {
    parentId: '1',
    categoryId: '8',
    categoryName: 'RV',
  },
  {
    parentId: '1',
    categoryId: '9',
    categoryName: 'SUV',
  },
  {
    parentId: '1',
    categoryId: '10',
    categoryName: '밴',
  },
];

const DUMMY_MODELS: ModelsType = [
  {
    modelId: '1',
    modelName: 'X1',
    brandName: 'BMW',
  },
  {
    modelId: '2',
    modelName: '아이오닉',
    brandName: 'Hyundai',
  },
  {
    modelId: '3',
    modelName: 'porsche',
    brandName: 'Porsche',
  },
];

const DUMMY_BRANDS: BrandsType = [
  {
    brandId: '1',
    brandName: 'Hyundai',
  },
  {
    brandId: '2',
    brandName: 'Kia',
  },
  {
    brandId: '3',
    brandName: 'Audi',
  },
  {
    brandId: '4',
    brandName: 'Porsche',
  },
  {
    brandId: '5',
    brandName: 'BMW',
  },
];

function CreateCarPageContent() {
  const fuels = DUMMY_FUELS;
  const {inputValues} = useInputValues();

  // TODO: Load categories

  // TODO: Load actual fuels

  // TODO: Load actual brands
  const {
    data: brands,
    isLoading: brandsLoading,
    isError: brandsError,
  } = useSuspenseQuery({
    queryKey: ['BRANDS'],
    queryFn: () => getBrands(),
  });
  console.log(brands);

  // TODO: Load the models from the selected brands

  // Map the parent's category name for display
  const fullCategoryMapping = mapParentCategoryNames(DUMMY_CATEGORIES);
  const categoryOptions: SubjectOptions[] = fullCategoryMapping
    .filter((category) => category.parentId !== null)
    .map((cat) => {
      return {
        key: cat.categoryId,
        name: `${cat.parentCategoryName} ${cat.categoryName}`,
      };
    });

  const brandOptions: SubjectOptions[] = brands.map((brand) => {
    return {
      key: brand.brandId,
      name: `${brand.brandName}`,
    };
  });

  const modelOptions: SubjectOptions[] = DUMMY_MODELS.map((model) => {
    return {
      key: model.modelId,
      name: `${model.modelName}`,
    };
  });

  const fuelOptions: SubjectOptions[] = DUMMY_FUELS.map((fuel) => {
    return {
      key: fuel.fuelId,
      name: fuel.fuelName,
    };
  });

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

  // TODO: Handle sending data (using useMutation())
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

export default function CreateCarPage() {
  return (
    <AdminCreateEditProvider>
      <CreateCarPageContent />
    </AdminCreateEditProvider>
  );
}
