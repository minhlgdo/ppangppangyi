import {Box} from '@mui/material';
import {PageHeader} from '@src/components/admin/PageHeader.tsx';
import {AdminPageTypes, CREATE_RESULT_ITEMS, ResponseTypes, ResponseTypeValue} from '@src/common/constants.ts';
import {useState} from 'react';
import SaveComponent from '@src/components/admin/SaveComponent.tsx';
import InputFields, {FieldType} from '@src/components/admin/InputFields.tsx';
import {FUEL_MAIN_NAV} from '@src/common/navigation.ts';
import {useNavigate} from 'react-router-dom';
import ResponseDialog from '@src/components/admin/ResponseDialog.tsx';

export default function CreateFuelPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [result, setResult] = useState(ResponseTypes.Unknown);
  const navigate = useNavigate();

  const REQUIRED_FIELDS = [
    {
      name: 'Fuel',
      required: true,
      type: FieldType.Text,
    },
  ];

  const onSaveClick = () => {
    // TODO: Send the received data to the server
    // TODO: Depending on the receiving result, save the corresponding result
    setResult(ResponseTypes.Success);
    setOpenDialog(true);
  };

  const onCancelClick = () => {
    navigate(FUEL_MAIN_NAV); // go back to the main page
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    if (result === ResponseTypes.Success) {
      navigate(FUEL_MAIN_NAV);
    }
  };

  const getMessage = (key: ResponseTypeValue): string => {
    return CREATE_RESULT_ITEMS[key];
  };

  return (
    <Box sx={{m: 4, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 4}}>
      <PageHeader pageType={AdminPageTypes.Create} />
      <InputFields fields={REQUIRED_FIELDS} />
      <SaveComponent
        onSave={onSaveClick}
        onCancel={onCancelClick}
      />
      <ResponseDialog
        isOpened={openDialog}
        text={getMessage(result)}
        handleClose={handleDialogClose}
      />
    </Box>
  );
}
