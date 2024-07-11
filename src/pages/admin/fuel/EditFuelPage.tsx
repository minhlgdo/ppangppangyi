import {useParams} from 'react-router-dom';
import {useState} from 'react';
import {AdminPageTypes, FieldTypes, Subjects} from '@src/common/constants.ts';
import {RequiredFieldType} from '@src/common/types.ts';
import CreateEditLayout from '@src/layout/admin/CreateEditLayout.tsx';

export default function EditFuelPage() {
  const {fueldId} = useParams();
  const [fuelName, setFuelName] = useState('');

  const REQUIRED_INPUTS: RequiredFieldType[] = [
    {
      name: '연류',
      required: true,
      type: FieldTypes.Text,
      defaultValue: fuelName,
    },
  ];

  // TODO: load fuel name

  // TODO: Handle sending data to the API
  const handleSendData = () => {};

  return (
    <CreateEditLayout
      subject={Subjects.Fuel}
      requiredFields={REQUIRED_INPUTS}
      view={AdminPageTypes.Edit}
      handleSendData={handleSendData}
    />
  );
}
