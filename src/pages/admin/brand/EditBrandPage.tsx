import {useParams} from 'react-router-dom';
import {useState} from 'react';
import {AdminPageTypes, FieldTypes} from '@src/common/constants.ts';
import {RequiredFieldType} from '@src/common/types.ts';
import CreateEditLayout from '@src/layout/admin/CreateEditLayout.tsx';

export default function EditBrandPage() {
  const {brandId} = useParams();
  const [brandName, setBrandName] = useState('');

  const REQUIRED_INPUTS: RequiredFieldType[] = [
    {
      name: 'Brand',
      required: true,
      type: FieldTypes.Text,
      defaultValue: brandName,
    },
  ];

  // TODO: load brand name

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
