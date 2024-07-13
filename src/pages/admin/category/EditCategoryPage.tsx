import {Category, InputValuesType, RequiredFieldType} from '@src/common/types.ts';
import {AdminPageTypes, FieldTypes, PARENT_CATEGORIES, Subjects} from '@src/common/constants.ts';
import CreateEditLayout from '@src/layout/admin/CreateEditLayout.tsx';
import {useParams} from 'react-router-dom';
import {useState} from 'react';

export default function EditCategoryPage() {
  const {categoryId} = useParams();
  const [parentId, setParentId] = useState(0);
  const [categoryName, setCategoryName] = useState('');

  // TODO: Load actual information here

  const REQUIRED_FIELDS: RequiredFieldType<Category>[] = [
    {
      name: 'parentId',
      label: '부모 분류',
      required: true,
      type: FieldTypes.Dropdown,
      selections: PARENT_CATEGORIES,
      defaultValue: parentId,
      selectionLabel: 'categoryName',
      selectionIndex: 'categoryId',
    },
    {
      name: 'categoryName',
      label: '분류',
      required: true,
      type: FieldTypes.Text,
      defaultValue: categoryName,
    },
  ];

  // TODO: Handle sending data
  const handleSendData = (data: InputValuesType) => {
    // Test input data
    console.log(data);
  };

  return (
    <CreateEditLayout
      subject={Subjects.Category}
      requiredFields={REQUIRED_FIELDS}
      view={AdminPageTypes.Edit}
      handleSendData={handleSendData}
    />
  );
}
