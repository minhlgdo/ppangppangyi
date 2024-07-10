import {RequiredFieldType} from '@src/common/types.ts';
import {AdminPageTypes, FieldTypes} from '@src/common/constants.ts';
import CreateEditLayout from '@src/layout/admin/CreateEditLayout.tsx';
import {useParams} from 'react-router-dom';
import {useState} from 'react';

export default function EditModelPage() {
  const {modelId} = useParams();
  const [modelName, setModelName] = useState('');
  const [brandName, setBrandName] = useState('');

  const REQUIRED_INPUTS: RequiredFieldType[] = [
    {
      name: 'Model name',
      required: true,
      type: FieldTypes.Text,
      defaultValue: modelName,
    },
    {
      name: 'Brand name',
      required: true,
      type: FieldTypes.Text,
      defaultValue: brandName,
    },
  ];

  // TODO: Handle sending data to the API
  const handleSendData = () => {};

  return (
    <CreateEditLayout
      requiredFields={REQUIRED_INPUTS}
      view={AdminPageTypes.Edit}
      handleSendData={handleSendData}
    />
  );
}
