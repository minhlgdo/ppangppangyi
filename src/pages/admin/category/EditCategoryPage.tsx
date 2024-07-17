import {Category, InputValuesType, RequiredFieldType} from '@src/common/types.ts';
import {AdminPageTypes, FieldTypes, ResponseTypes, Subjects} from '@src/common/constants.ts';
import CreateEditLayout from '@src/layout/admin/CreateEditLayout.tsx';
import {useParams} from 'react-router-dom';
import AdminCreateEditProvider, {useDialogOpen, useResponseType} from '@src/context/AdminCreateEditContext.tsx';
import {useMutation, useQueryClient, useSuspenseQuery} from '@tanstack/react-query';
import {editCategory, getCategory, getParentCategories} from '@src/api/admin-api.ts';
import {mapParentCategories} from '@src/common/mapping-utils.ts';
import {useEffect} from 'react';

function EditCategoryPageContent() {
  const {categoryId} = useParams();
  const {setResponseType} = useResponseType();
  const {setDialogOpen} = useDialogOpen();

  // Load actual information here
  const {data: category, isError: fetchInfoError} = useSuspenseQuery({
    queryKey: ['category', categoryId],
    queryFn: () => getCategory(categoryId!),
  });

  // Get the parent category
  const {data: parentCategories, isError: fetchParentCatError} = useSuspenseQuery({
    queryKey: ['parent-categories'],
    queryFn: () => getParentCategories(),
  });

  useEffect(() => {
    if (fetchInfoError || fetchParentCatError) {
      setDialogOpen(true);
      setResponseType(ResponseTypes.Unknown);
    } else {
      setDialogOpen(false);
    }
    // eslint-disable-next-line
  }, [fetchInfoError, fetchParentCatError]);

  // Map the parent category
  const parentCategoryOptions = mapParentCategories(parentCategories);

  const REQUIRED_FIELDS: RequiredFieldType[] = [
    {
      name: 'parentCategoryId',
      label: '부모 분류',
      required: false,
      disable: true,
      type: FieldTypes.Dropdown,
      options: parentCategoryOptions,
      multipleOptions: false,
      defaultValue: category.parentCategoryId ?? '',
    },
    {
      name: 'categoryName',
      label: '분류',
      required: true,
      type: FieldTypes.Text,
      defaultValue: category.categoryName,
    },
  ];

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (cat: Category) => editCategory(categoryId!, cat),
    onSuccess: () => {
      setResponseType(ResponseTypes.Success);
      queryClient.invalidateQueries({queryKey: ['category', categoryId]});
      queryClient.invalidateQueries({queryKey: ['parent-categories']});
    },
    onError: () => {
      setResponseType(ResponseTypes.Failure);
    },
    onSettled: () => {
      setDialogOpen(true);
    },
  });

  // TODO: Handle sending data
  const handleSendData = (data: InputValuesType) => {
    const cat: Category = {
      parentCategoryId: data.parentId as string,
      categoryName: data.categoryName as string,
    };
    mutation.mutate(cat);
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

export default function EditCategoryPage() {
  return (
    <AdminCreateEditProvider>
      <EditCategoryPageContent />
    </AdminCreateEditProvider>
  );
}
