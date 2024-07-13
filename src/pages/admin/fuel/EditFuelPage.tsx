import {useParams} from 'react-router-dom';
import {useState} from 'react';
import {AdminPageTypes, FieldTypes, Subjects} from '@src/common/constants.ts';
import {InputValuesType, RequiredFieldType} from '@src/common/types.ts';
import CreateEditLayout from '@src/layout/admin/CreateEditLayout.tsx';
import AdminCreateEditProvider from '@src/context/AdminCreateEditContext.tsx';

export default function EditFuelPage() {
  const {fueldId} = useParams();
  const [fuelName, setFuelName] = useState('');

  const REQUIRED_INPUTS: RequiredFieldType<never>[] = [
    {
      name: 'fuelName',
      label: '연류',
      required: true,
      type: FieldTypes.Text,
      defaultValue: fuelName,
    },
  ];

  // TODO: load fuel name

  // TODO: Handle sending data to the API
  const handleSendData = (data: InputValuesType) => {
    // Test
    console.log(data);
  };

  return (
    <AdminCreateEditProvider>
      <CreateEditLayout
        subject={Subjects.Fuel}
        requiredFields={REQUIRED_INPUTS}
        view={AdminPageTypes.Edit}
        handleSendData={handleSendData}
      />
    </AdminCreateEditProvider>
  );
}
