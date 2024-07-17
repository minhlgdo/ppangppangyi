import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {AdminPageTypes, FieldTypes, ResponseTypes, Subjects} from '@src/common/constants.ts';
import {Fuel, InputValuesType, RequiredFieldType} from '@src/common/types.ts';
import CreateEditLayout from '@src/layout/admin/CreateEditLayout.tsx';
import AdminCreateEditProvider, {useDialogOpen, useResponseType} from '@src/context/AdminCreateEditContext.tsx';
import {useMutation, useQueryClient, useSuspenseQuery} from '@tanstack/react-query';
import {editFuel, getFuel} from '@src/api/admin-api.ts';

function EditFuelPageContent() {
  const {fuelId} = useParams();
  const {setResponseType} = useResponseType();
  const {setDialogOpen} = useDialogOpen();

  // Load fuel name
  const {data: fuel, isError: fetchError} = useSuspenseQuery({
    queryKey: ['fuel', fuelId!],
    queryFn: () => getFuel(fuelId!),
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
      name: 'fuelName',
      label: '연료',
      required: true,
      type: FieldTypes.Text,
      defaultValue: fuel?.fuelName,
    },
  ];

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (fuel: Fuel) => editFuel(fuelId!, fuel),
    onSuccess: () => {
      setResponseType(ResponseTypes.Success);
      queryClient.invalidateQueries({queryKey: ['fuel', fuelId]});
    },
    onError: () => {
      setResponseType(ResponseTypes.Failure);
    },
    onSettled: () => {
      setDialogOpen(true);
    },
  });

  const handleSendData = (data: InputValuesType) => {
    const newFuel: Fuel = {
      fuelName: data.fuelName as string,
    };
    mutation.mutate(newFuel);
  };

  return (
    <CreateEditLayout
      subject={Subjects.Fuel}
      requiredFields={REQUIRED_INPUTS}
      view={AdminPageTypes.Edit}
      handleSendData={handleSendData}
    />
  );
}

export default function EditFuelPage() {
  return (
    <AdminCreateEditProvider>
      <EditFuelPageContent />
    </AdminCreateEditProvider>
  );
}
