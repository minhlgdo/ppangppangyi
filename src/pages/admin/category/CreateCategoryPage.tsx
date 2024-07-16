import {InputValuesType, RequiredFieldType, SubjectOptions} from '@src/common/types.ts';
import {AdminPageTypes, FieldTypes, PARENT_CATEGORIES, Subjects} from '@src/common/constants.ts';
import CreateEditLayout from '@src/layout/admin/CreateEditLayout.tsx';
import AdminCreateEditProvider from '@src/context/AdminCreateEditContext.tsx';

export default function CreateCategoryPage() {
  // TODO: Get the real parent categories

  // Map
  const parentCategoryOptions: SubjectOptions[] = PARENT_CATEGORIES.map((opt) => {
    return {
      key: opt.categoryId,
      name: opt.categoryName,
    };
  });

  const REQUIRED_FIELDS: RequiredFieldType[] = [
    {
      name: 'parentId',
      label: '부모 분류',
      required: false,
      type: FieldTypes.Dropdown,
      options: parentCategoryOptions,
    },
    {
      name: 'categoryName',
      label: '분류',
      required: true,
      type: FieldTypes.Text,
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
        view={AdminPageTypes.Create}
        handleSendData={handleSendData}
      />
    </AdminCreateEditProvider>
  );
}
