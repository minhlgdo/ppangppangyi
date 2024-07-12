import {CategoriesType, Category, InputValuesType, RequiredFieldType} from '@src/common/types.ts';
import {AdminPageTypes, FieldTypes, PARENT_CATEGORIES, Subjects} from '@src/common/constants.ts';
import CreateEditLayout from '@src/layout/admin/CreateEditLayout.tsx';

export default function CreateCategoryPage() {
  const REQUIRED_FIELDS: RequiredFieldType<Category>[] = [
    {
      name: 'parentId',
      label: '부모 분류',
      required: true,
      type: FieldTypes.Dropdown,
      selections: PARENT_CATEGORIES,
      selectionIndex: 'categoryId',
      selectionLabel: 'categoryName',
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
    <CreateEditLayout
      subject={Subjects.Category}
      requiredFields={REQUIRED_FIELDS}
      view={AdminPageTypes.Create}
      handleSendData={handleSendData}
    />
  );
}
