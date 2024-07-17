import {AdminPageTypes, FieldTypes, ResponseTypes, Subjects} from '@src/common/constants.ts';
import CreateEditLayout from '@src/layout/admin/CreateEditLayout.tsx';
import {Brand, InputValuesType, RequiredFieldType} from '@src/common/types.ts';
import AdminCreateEditProvider, {useDialogOpen, useResponseType} from '@src/context/AdminCreateEditContext.tsx';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createBrand} from '@src/api/admin-api.ts';

function CreateBrandContent() {
  const {setResponseType} = useResponseType();
  const {setDialogOpen} = useDialogOpen();
  const queryClient = useQueryClient();

  const REQUIRED_INPUTS: RequiredFieldType[] = [
    {
      name: 'brandName',
      label: '브랜드',
      required: true,
      type: FieldTypes.Text,
    },
  ];

  const mutation = useMutation({
    mutationFn: (brand: Brand) => createBrand(brand),
    onSuccess: () => {
      setResponseType(ResponseTypes.Success);
      queryClient.invalidateQueries({queryKey: ['all-brands']});
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
    const newBrand: Brand = {
      brandName: data.brandName as string,
    };
    mutation.mutate(newBrand);
  };

  return (
    <CreateEditLayout
      subject={Subjects.Brand}
      requiredFields={REQUIRED_INPUTS}
      view={AdminPageTypes.Create}
      handleSendData={handleSendData}
    />
  );
}

export default function CreateBrandPage() {
  return (
    <AdminCreateEditProvider>
      <CreateBrandContent />
    </AdminCreateEditProvider>
  );
}
