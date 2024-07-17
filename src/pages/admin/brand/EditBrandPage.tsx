import {useParams} from 'react-router-dom';
import {AdminPageTypes, FieldTypes, ResponseTypes, Subjects} from '@src/common/constants.ts';
import {Brand, InputValuesType, RequiredFieldType} from '@src/common/types.ts';
import CreateEditLayout from '@src/layout/admin/CreateEditLayout.tsx';
import AdminCreateEditProvider, {useDialogOpen, useResponseType} from '@src/context/AdminCreateEditContext.tsx';
import {useMutation, useQueryClient, useSuspenseQuery} from '@tanstack/react-query';
import {getBrand, updateBrand} from '@src/api/admin-api.ts';
import {useEffect} from 'react';
import ErrorBoundaryWrapper from '@src/pages/ErrorBoundaryWrapper.tsx';

function EditBrandPageContent() {
  const {brandId} = useParams();
  const {setResponseType} = useResponseType();
  const {setDialogOpen} = useDialogOpen();
  const queryClient = useQueryClient();

  // Load brand name
  const {data: brand, isError: fetchError} = useSuspenseQuery({
    queryKey: ['brand', brandId],
    queryFn: () => getBrand(brandId!),
  });

  // To prevent updating state before loading EditBrandPageContent
  useEffect(() => {
    if (fetchError) {
      setDialogOpen(true);
      setResponseType(ResponseTypes.Unknown);
    } else {
      setDialogOpen(false);
    }
  }, [fetchError, setDialogOpen, setResponseType]);

  const REQUIRED_INPUTS: RequiredFieldType[] = [
    {
      name: 'brandName',
      label: '브랜드',
      required: true,
      type: FieldTypes.Text,
      defaultValue: brand?.brandName,
    },
  ];

  const mutation = useMutation({
    mutationFn: (brand: Brand) => updateBrand(brandId!, brand),
    onSuccess: () => {
      setResponseType(ResponseTypes.Success);
      queryClient.invalidateQueries({queryKey: ['brand', brandId]});
    },
    onError: () => {
      setResponseType(ResponseTypes.Failure);
    },
    onSettled: () => {
      setDialogOpen(true);
    },
  });

  // TODO: Handle sending data to the API
  const handleSendData = (data: InputValuesType) => {
    // Test
    const newBrand: Brand = {
      brandName: data.brandName as string,
    };
    mutation.mutate(newBrand);
  };

  return (
    <CreateEditLayout
      subject={Subjects.Brand}
      requiredFields={REQUIRED_INPUTS}
      view={AdminPageTypes.Edit}
      handleSendData={handleSendData}
    />
  );
}

export default function EditBrandPage() {
  return (
    <AdminCreateEditProvider>
      <ErrorBoundaryWrapper>
        <EditBrandPageContent />
      </ErrorBoundaryWrapper>
    </AdminCreateEditProvider>
  );
}
