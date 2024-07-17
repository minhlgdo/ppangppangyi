import CreateEditLayout from '@src/layout/admin/CreateEditLayout.tsx';
import {Fuel, InputValuesType, RequiredFieldType} from '@src/common/types.ts';
import {AdminPageTypes, FieldTypes, ResponseTypes, Subjects} from '@src/common/constants.ts';
import AdminCreateEditProvider, {useDialogOpen, useResponseType} from '@src/context/AdminCreateEditContext.tsx';
import {useMutation} from '@tanstack/react-query';
import {createFuel} from '@src/api/admin-api.ts';

function CreateFuelPageContent() {
  const {setResponseType} = useResponseType();
  const {setDialogOpen} = useDialogOpen();

  const REQUIRED_FIELDS: RequiredFieldType[] = [
    {
      name: 'fuelName',
      label: '연료',
      required: true,
      type: FieldTypes.Text,
    },
  ];

  const mutation = useMutation({
    mutationFn: (fuel: Fuel) => createFuel(fuel),
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

  // TODO: Handle sending data
  const handleSendData = (data: InputValuesType) => {
    const newFuel: Fuel = {
      fuelName: data.fuelName as string,
    };
    mutation.mutate(newFuel);
  };

  return (
    <CreateEditLayout
      subject={Subjects.Fuel}
      requiredFields={REQUIRED_FIELDS}
      view={AdminPageTypes.Create}
      handleSendData={handleSendData}
    />
  );
}

export default function CreateFuelPage() {
  return (
    <AdminCreateEditProvider>
      <CreateFuelPageContent />
    </AdminCreateEditProvider>
  );
}
