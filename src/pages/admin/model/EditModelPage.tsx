import {InputValuesType, Model, RequiredFieldType} from '@src/common/types.ts';
import {AdminPageTypes, FieldTypes, ResponseTypes, Subjects} from '@src/common/constants.ts';
import CreateEditLayout from '@src/layout/admin/CreateEditLayout.tsx';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import AdminCreateEditProvider, {useDialogOpen, useResponseType} from '@src/context/AdminCreateEditContext.tsx';
import {useMutation, useQueryClient, useSuspenseQuery} from '@tanstack/react-query';
import {editModel, getModel} from '@src/api/admin-api.ts';

function EditModelPageContent() {
  const {modelId} = useParams();
  const {setResponseType} = useResponseType();
  const {setDialogOpen} = useDialogOpen();

  // Load saved information
  const {data: model, isError: isModelError} = useSuspenseQuery({
    queryKey: ['model', modelId],
    queryFn: () => getModel(modelId!),
  });

  useEffect(() => {
    if (isModelError) {
      setDialogOpen(true);
      setResponseType(ResponseTypes.Unknown);
    } else {
      setDialogOpen(false);
    }
    // eslint-disable-next-line
  }, [isModelError]);

  const REQUIRED_INPUTS: RequiredFieldType[] = [
    {
      name: 'brandId',
      label: '브랜드',
      required: true,
      type: FieldTypes.Text,
      disable: true,
      defaultValue: model.brandName,
    },
    {
      name: 'modelName',
      label: '모델',
      required: true,
      type: FieldTypes.Text,
      defaultValue: model.modelName,
    },
  ];

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (model: Model) => editModel(modelId!, model),
    onSuccess: () => {
      setResponseType(ResponseTypes.Success);
      queryClient.invalidateQueries({queryKey: ['model', modelId]});
    },
    onError: () => {
      setResponseType(ResponseTypes.Failure);
    },
    onSettled: () => {
      setDialogOpen(true);
    },
  });
  const handleSendData = (data: InputValuesType) => {
    const model: Model = {
      modelName: data.modelName as string,
    };
    mutation.mutate(model);
  };

  return (
    <CreateEditLayout
      subject={Subjects.Model}
      requiredFields={REQUIRED_INPUTS}
      view={AdminPageTypes.Edit}
      handleSendData={handleSendData}
    />
  );
}

export default function EditModelPage() {
  return (
    <AdminCreateEditProvider>
      <EditModelPageContent />
    </AdminCreateEditProvider>
  );
}
