import {RequiredFieldType} from '@src/common/types.ts';
import {AdminPageTypes, FieldTypes, Subjects} from '@src/common/constants.ts';
import CreateEditLayout from '@src/layout/admin/CreateEditLayout.tsx';
import {useParams} from 'react-router-dom';
import {useState} from 'react';

export default function EditModelPage() {
  const {modelId} = useParams();
  const [modelName, setModelName] = useState('');
  const [brandName, setBrandName] = useState('');

  const REQUIRED_INPUTS: RequiredFieldType<never>[] = [
    {
      name: 'modelName',
      label: '모델',
      required: true,
      type: FieldTypes.Text,
      defaultValue: modelName,
    },
    {
      name: 'brandName',
      label: '브랜드',
      required: true,
      type: FieldTypes.Text,
      defaultValue: brandName,
    },
  ];

  // TODO: Handle sending data to the API
  const handleSendData = () => {};

  return (
    <CreateEditLayout
      subject={Subjects.Model}
      requiredFields={REQUIRED_INPUTS}
      view={AdminPageTypes.Edit}
      handleSendData={handleSendData}
    />
  );
}
