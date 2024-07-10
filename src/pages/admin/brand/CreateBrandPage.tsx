import {AdminPageTypes, FieldTypes, Subjects} from '@src/common/constants.ts';
import CreateEditLayout from '@src/layout/admin/CreateEditLayout.tsx';
import {RequiredFieldType} from '@src/common/types.ts';

export default function CreateBrandPage() {
  const REQUIRED_INPUTS: RequiredFieldType[] = [
    {
      name: 'Brand',
      required: true,
      type: FieldTypes.Text,
    },
  ];

  // TODO: Handle sending data to the API
  const handleSendData = () => {};

  return (
    <CreateEditLayout
      subject={Subjects.Brand}
      requiredFields={REQUIRED_INPUTS}
      view={AdminPageTypes.Create}
      handleSendData={handleSendData}
    />
  );
}
