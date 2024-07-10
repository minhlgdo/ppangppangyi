import CreateEditLayout from '@src/layout/admin/CreateEditLayout.tsx';
import {RequiredFieldType} from '@src/common/types.ts';
import {AdminPageTypes, FieldTypes} from '@src/common/constants.ts';

export default function CreateFuelPage() {
  const REQUIRED_FIELDS: RequiredFieldType[] = [
    {
      name: 'Fuel',
      required: true,
      type: FieldTypes.Text,
    },
  ];

  // TODO: Handle sending data
  const handleSendData = () => {};

  return (
    <CreateEditLayout
      requiredFields={REQUIRED_FIELDS}
      view={AdminPageTypes.Create}
      handleSendData={handleSendData}
    />
  );
}
