import {Category, InputValuesType, RequiredFieldType} from '@src/common/types.ts';
import {AdminPageTypes, FieldTypes, ResponseTypes, Subjects} from '@src/common/constants.ts';
import CreateEditLayout from '@src/layout/admin/CreateEditLayout.tsx';
import AdminCreateEditProvider, {useDialogOpen, useResponseType} from '@src/context/AdminCreateEditContext.tsx';
import {useMutation, useSuspenseQuery} from '@tanstack/react-query';
import {createCategory, getParentCategories} from '@src/api/admin-api.ts';
import {mapParentCategories} from '@src/common/mapping-utils.ts';
import {useEffect} from 'react';

function CreateCategoryPageContent() {
  const {setResponseType} = useResponseType();
  const {setDialogOpen} = useDialogOpen();

  // Get the real parent categories
  const {data: parentCategories, isError: fetchError} = useSuspenseQuery({
    queryKey: ['parent-categories'],
    queryFn: () => getParentCategories(),
  });

  useEffect(() => {
    if (fetchError) {
      setDialogOpen(true);
      setResponseType(ResponseTypes.Unknown);
    } else {
      setDialogOpen(false);
    }
  }, [fetchError, setDialogOpen, setResponseType]);

  // Map
  const parentCategoryOptions = mapParentCategories(parentCategories);

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

  const mutation = useMutation({
    mutationFn: (cat: Category) => createCategory(cat),
    onSuccess: () => {
      setResponseType(ResponseTypes.Success);
    },
    onError: () => {
      setResponseType(ResponseTypes.Failure);
    },
    onSettled: () => {
      setDialogOpen(true);
    },
  });

  const handleSendData = (data: InputValuesType) => {
    const newCategory: Category = {
      parentId: data.parentId ? (data.parentId as string) : null,
      categoryName: data.categoryName as string,
    };
    mutation.mutate(newCategory);
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

export default function CreateCategoryPage() {
  return (
    <AdminCreateEditProvider>
      <CreateCategoryPageContent />
    </AdminCreateEditProvider>
  );
}
