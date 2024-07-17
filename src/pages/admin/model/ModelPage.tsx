import AdminGeneralContextProvider, {useDeleteResponse, useFetchError} from '@src/context/AdminGeneralContext.tsx';
import {ChangeEvent, useEffect, useState} from 'react';
import GeneralLayout from '@src/layout/admin/GeneralLayout.tsx';
import {ResponseTypes, Subjects} from '@src/common/constants.ts';
import {MODEL_CREATE_PATH, MODEL_MAIN_PATH} from '@src/common/navigation.ts';
import {mapModels} from '@src/common/mapping-utils.ts';
import {keepPreviousData, useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {deleteModel, getModels} from '@src/api/admin-api.ts';

function ModelPageContent() {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const {setResponse} = useDeleteResponse();
  const {setFetchError} = useFetchError();

  // Load all models
  const {
    data: modelsData,
    isError: isFetchError,
    isLoading,
  } = useQuery({
    queryKey: ['models', page],
    queryFn: () => getModels(page),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    setFetchError(isFetchError);
  }, [isFetchError, setFetchError]);

  const models = modelsData?.content;
  const totalPages = modelsData?.page.totalPages ?? 1;
  const totalItems = modelsData?.page.totalElements ?? '0';

  const modelOptions = models ? mapModels(models) : [];

  const mutation = useMutation({
    mutationFn: (modelId: string) => deleteModel(modelId),
    onSuccess: () => {
      setResponse(ResponseTypes.Success);
      queryClient.invalidateQueries({queryKey: ['models', page]});
    },
    onError: () => {
      setResponse(ResponseTypes.Failure);
    },
  });

  const handleDeleteItem = (id: string) => {
    mutation.mutate(id);
  };

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  return (
    <GeneralLayout
      subject={Subjects.Model}
      createPagePath={MODEL_CREATE_PATH}
      totalItems={totalItems}
      items={modelOptions}
      isLoadingItems={isLoading}
      basePagePath={MODEL_MAIN_PATH}
      totalPages={totalPages}
      page={page}
      handlePageChange={handlePageChange}
      handleDeleteItem={handleDeleteItem}
    />
  );
}

export default function ModelPage() {
  return (
    <AdminGeneralContextProvider>
      <ModelPageContent />
    </AdminGeneralContextProvider>
  );
}
