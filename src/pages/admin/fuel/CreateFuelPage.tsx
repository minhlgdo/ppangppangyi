import CreateEditLayout from '@src/layout/admin/CreateEditLayout.tsx';
import {RequiredFieldType} from '@src/common/types.ts';
import {AdminPageTypes, FieldTypes, Subjects} from '@src/common/constants.ts';
import AdminCreateEditProvider from '@src/context/AdminCreateEditContext.tsx';

export default function CreateFuelPage() {
  const REQUIRED_FIELDS: RequiredFieldType[] = [
    {
      name: 'fuelName',
      label: '연료',
      required: true,
      type: FieldTypes.Text,
    },
  ];

  // TODO: Handle sending data
  const handleSendData = () => {};

  return (
    <AdminCreateEditProvider>
      <CreateEditLayout
        subject={Subjects.Fuel}
        requiredFields={REQUIRED_FIELDS}
        view={AdminPageTypes.Create}
        handleSendData={handleSendData}
      />
    </AdminCreateEditProvider>
  );
}
