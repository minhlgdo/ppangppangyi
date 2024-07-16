import {AdminPageTypes, FieldTypes, Subjects} from '@src/common/constants.ts';
import CreateEditLayout from '@src/layout/admin/CreateEditLayout.tsx';
import {InputValuesType, RequiredFieldType} from '@src/common/types.ts';
import AdminCreateEditProvider from '@src/context/AdminCreateEditContext.tsx';

export default function CreateBrandPage() {
  const REQUIRED_INPUTS: RequiredFieldType[] = [
    {
      name: 'brandName',
      label: '브랜드',
      required: true,
      type: FieldTypes.Text,
    },
  ];

  // TODO: Handle sending data to the API
  const handleSendData = (data: InputValuesType) => {
    // Test
    console.log(data);
  };

  return (
    <AdminCreateEditProvider>
      <CreateEditLayout
        subject={Subjects.Brand}
        requiredFields={REQUIRED_INPUTS}
        view={AdminPageTypes.Create}
        handleSendData={handleSendData}
      />
    </AdminCreateEditProvider>
  );
}
