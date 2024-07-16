import {useParams} from 'react-router-dom';
import {useState} from 'react';
import {AdminPageTypes, FieldTypes, Subjects} from '@src/common/constants.ts';
import {InputValuesType, RequiredFieldType} from '@src/common/types.ts';
import CreateEditLayout from '@src/layout/admin/CreateEditLayout.tsx';
import AdminCreateEditProvider from '@src/context/AdminCreateEditContext.tsx';

export default function EditBrandPage() {
  const {brandId} = useParams();
  const [brandName, setBrandName] = useState('');

  const REQUIRED_INPUTS: RequiredFieldType[] = [
    {
      name: 'brandName',
      label: '브랜드',
      required: true,
      type: FieldTypes.Text,
      defaultValue: brandName,
    },
  ];

  // TODO: load brand name

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
        view={AdminPageTypes.Edit}
        handleSendData={handleSendData}
      />
    </AdminCreateEditProvider>
  );
}
