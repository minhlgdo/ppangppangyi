import CreateEditLayout from '@src/layout/admin/CreateEditLayout.tsx';
import {RequiredFieldType} from '@src/common/types.ts';
import {AdminPageTypes, FieldTypes, Subjects} from '@src/common/constants.ts';

export default function CreateFuelPage() {
  const REQUIRED_FIELDS: RequiredFieldType[] = [
    {
      name: 'fuelName',
      label: '연류',
      required: true,
      type: FieldTypes.Text,
    },
  ];

  // TODO: Handle sending data
  const handleSendData = () => {};

  return (
    <CreateEditLayout
      subject={Subjects.Fuel}
      requiredFields={REQUIRED_FIELDS}
      view={AdminPageTypes.Create}
      handleSendData={handleSendData}
    />
  );
}
