import AdminGeneralContextProvider, {useDeleteResponse, useFetchError} from '@src/context/AdminGeneralContext.tsx';
import {ChangeEvent, useEffect, useState} from 'react';
import {mapExtendedCategories, mapParentCategoryNames} from '@src/common/mapping-utils.ts';
import GeneralLayout from '@src/layout/admin/GeneralLayout.tsx';
import {ResponseTypes, Subjects} from '@src/common/constants.ts';
import {CATEGORY_CREATE_PATH, CATEGORY_MAIN_PATH} from '@src/common/navigation.ts';
import {keepPreviousData, useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {deleteCategory, getCategories, getParentCategories} from '@src/api/admin-api.ts';
import ErrorBoundaryWrapper from '@src/pages/ErrorBoundaryWrapper.tsx';

function CategoryPageContent() {
  // Variables
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const {setResponse} = useDeleteResponse();
  const {setFetchError} = useFetchError();

  // Load the real category list here
  const {
    data: categoriesData,
    isError: isFetchDataError,
    isLoading: isLoadingCategories,
  } = useQuery({
    queryKey: ['categories', page],
    queryFn: () => getCategories(page),
    placeholderData: keepPreviousData,
  });

  const {data: parentCategories, isError: isFetchParentError} = useQuery({
    queryKey: ['parent-categories'],
    queryFn: () => getParentCategories(),
  });

  useEffect(() => {
    setFetchError(isFetchDataError || isFetchDataError);
    // eslint-disable-next-line
  }, [isFetchDataError, isFetchParentError]);

  const categories = categoriesData?.content;
  const totalPages = categoriesData?.page.totalPages ?? 1;
  const totalItems = categoriesData?.page.totalElements ?? '0';

  // Redirect after deleting the last item of the page
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  // Map the parent's category name for display
  const displayCategoryList = categories && parentCategories ? mapParentCategoryNames(categories, parentCategories) : [];
  const categoryOptions = mapExtendedCategories(displayCategoryList);

  const mutation = useMutation({
    mutationFn: (categoryId: string) => deleteCategory(categoryId),
    onSuccess: () => {
      setResponse(ResponseTypes.Success);
      queryClient.invalidateQueries({queryKey: ['categories', page]});
    },
    onError: () => {
      setResponse(ResponseTypes.Failure);
    },
  });

  const handleDeleteItem = (id: string) => {
    mutation.mutate(id);
  };

  // @ts-ignore
  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  return (
    <GeneralLayout
      subject={Subjects.Category}
      createPagePath={CATEGORY_CREATE_PATH}
      totalItems={totalItems}
      items={categoryOptions}
      isLoadingItems={isLoadingCategories}
      basePagePath={CATEGORY_MAIN_PATH}
      totalPages={totalPages}
      page={page}
      handlePageChange={handlePageChange}
      handleDeleteItem={handleDeleteItem}
    />
  );
}

export default function CategoryPage() {
  return (
    <AdminGeneralContextProvider>
      <ErrorBoundaryWrapper>
        <CategoryPageContent />
      </ErrorBoundaryWrapper>
    </AdminGeneralContextProvider>
  );
}
