import {RequiredFieldType} from '@src/common/types.ts';
import {AdminPageTypes, FieldTypes, Subjects} from '@src/common/constants.ts';
import CreateEditLayout from '@src/layout/admin/CreateEditLayout.tsx';

export default function CreateModelPage() {
  const REQUIRED_INPUTS: RequiredFieldType[] = [
    {
      name: 'Model name',
      required: true,
      type: FieldTypes.Text,
    },
    {
      name: 'Brand name',
      required: true,
      type: FieldTypes.Text,
    },
  ];

  // TODO: Handle sending data to the API
  const handleSendData = () => {};

  return (
    <CreateEditLayout
      subject={Subjects.Model}
      requiredFields={REQUIRED_INPUTS}
      view={AdminPageTypes.Create}
      handleSendData={handleSendData}
    />
  );
}
