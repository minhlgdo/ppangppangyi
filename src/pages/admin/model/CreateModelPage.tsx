import {RequiredFieldType} from '@src/common/types.ts';
import {AdminPageTypes, FieldTypes, Subjects} from '@src/common/constants.ts';
import CreateEditLayout from '@src/layout/admin/CreateEditLayout.tsx';
import AdminCreateEditProvider from '@src/context/AdminCreateEditContext.tsx';

export default function CreateModelPage() {
  const REQUIRED_INPUTS: RequiredFieldType<never>[] = [
    {
      name: 'modelName',
      label: '모델',
      required: true,
      type: FieldTypes.Text,
    },
    {
      name: 'brandName',
      label: '브랜드',
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
