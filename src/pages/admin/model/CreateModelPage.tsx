import {RequiredFieldType} from '@src/common/types.ts';
import {AdminPageTypes, FieldTypes, Subjects} from '@src/common/constants.ts';
import CreateEditLayout from '@src/layout/admin/CreateEditLayout.tsx';
import AdminCreateEditProvider from '@src/context/AdminCreateEditContext.tsx';
import {useSuspenseQuery} from '@tanstack/react-query';
import {getBrands} from '@src/api/admin-api.ts';
import {mapBrands} from '@src/common/mapping-utils.ts';

export default function CreateModelPage() {
  // Load the brands
  const {
    data: brands,
    isLoading: brandsLoading,
    isError: brandsError,
  } = useSuspenseQuery({
    queryKey: ['brands'],
    queryFn: () => getBrands(),
    refetchInterval: 10000,
  });

  // Mapping
  const brandsOptions = mapBrands(brands);

  const REQUIRED_INPUTS: RequiredFieldType[] = [
    {
      name: 'brandName',
      label: '브랜드',
      required: true,
      type: FieldTypes.Autocomplete,
      options: brandsOptions,
    },
    {
      name: 'modelName',
      label: '모델',
      required: true,
      type: FieldTypes.Text,
    },
  ];

  // TODO: Handle sending data to the API
  const handleSendData = () => {};

  return (
    <AdminCreateEditProvider>
      <CreateEditLayout
        subject={Subjects.Model}
        requiredFields={REQUIRED_INPUTS}
        view={AdminPageTypes.Create}
        handleSendData={handleSendData}
      />
    </AdminCreateEditProvider>
  );
}
