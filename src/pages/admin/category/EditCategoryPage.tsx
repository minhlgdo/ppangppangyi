import {Category, InputValuesType, RequiredFieldType, SubjectOptions} from '@src/common/types.ts';
import {AdminPageTypes, FieldTypes, PARENT_CATEGORIES, Subjects} from '@src/common/constants.ts';
import CreateEditLayout from '@src/layout/admin/CreateEditLayout.tsx';
import {useParams} from 'react-router-dom';
import {useState} from 'react';
import AdminCreateEditProvider from '@src/context/AdminCreateEditContext.tsx';

export default function EditCategoryPage() {
  const {categoryId} = useParams();
  const [parentId, setParentId] = useState(0);
  const [categoryName, setCategoryName] = useState('');

  // TODO: Load actual information here

  // TODO: Get the parent category

  // Map the parent category
  const parentCategoryOptions: SubjectOptions[] = PARENT_CATEGORIES.map((cat) => {
    return {
      key: cat.categoryId,
      name: cat.categoryName,
    };
  });

  const REQUIRED_FIELDS: RequiredFieldType[] = [
    {
      name: 'parentId',
      label: '부모 분류',
      required: true,
      type: FieldTypes.Dropdown,
      options: parentCategoryOptions,
      multipleOptions: false,
      defaultValue: parentId,
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
    <AdminCreateEditProvider>
      <CreateEditLayout
        subject={Subjects.Category}
        requiredFields={REQUIRED_FIELDS}
        view={AdminPageTypes.Edit}
        handleSendData={handleSendData}
      />
    </AdminCreateEditProvider>
  );
}
