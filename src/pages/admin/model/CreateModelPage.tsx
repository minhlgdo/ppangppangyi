import {InputValuesType, Model, RequiredFieldType} from '@src/common/types.ts';
import {AdminPageTypes, FieldTypes, ResponseTypes, Subjects} from '@src/common/constants.ts';
import CreateEditLayout from '@src/layout/admin/CreateEditLayout.tsx';
import AdminCreateEditProvider, {useDialogOpen, useResponseType} from '@src/context/AdminCreateEditContext.tsx';
import {useMutation, useSuspenseQuery} from '@tanstack/react-query';
import {createModel, getAllBrands} from '@src/api/admin-api.ts';
import {mapBrands} from '@src/common/mapping-utils.ts';
import {useEffect} from 'react';

function CreateModelPageContent() {
  const {setResponseType} = useResponseType();
  const {setDialogOpen} = useDialogOpen();

  // Load the brands
  const {data: brands, isError: isBrandsError} = useSuspenseQuery({
    queryKey: ['all-brands'],
    queryFn: () => getAllBrands(),
  });

  useEffect(() => {
    if (isBrandsError) {
      setDialogOpen(true);
      setResponseType(ResponseTypes.Unknown);
    } else {
      setDialogOpen(false);
    }
    // eslint-disable-next-line
  }, [isBrandsError]);

  // Mapping
  const brandsOptions = mapBrands(brands);

  const REQUIRED_INPUTS: RequiredFieldType[] = [
    {
      name: 'brandId',
      label: '브랜드',
      required: true,
      type: FieldTypes.Autocomplete,
      options: brandsOptions,
    },
    {
      name: 'modelName',
      label: '모델',
      required: true,
      type: FieldTypes.Text,
    },
  ];

  const mutation = useMutation({
    mutationFn: (model: Model) => createModel(model),
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

  // Handle sending data to the API
  const handleSendData = (data: InputValuesType) => {
    console.log(data);
    const newModel: Model = {
      brandId: data.brandId as string,
      modelName: data.modelName as string,
    };
    mutation.mutate(newModel);
  };

  return (
    <CreateEditLayout
      subject={Subjects.Model}
      requiredFields={REQUIRED_INPUTS}
      view={AdminPageTypes.Create}
      handleSendData={handleSendData}
    />
  );
}

export default function CreateModelPage() {
  return (
    <AdminCreateEditProvider>
      <CreateModelPageContent />
    </AdminCreateEditProvider>
  );
}
