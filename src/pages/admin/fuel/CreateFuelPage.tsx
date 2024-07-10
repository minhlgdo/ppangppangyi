import {Box} from '@mui/material';
import {PageHeader} from '@src/components/admin/PageHeader.tsx';
import {AdminPageTypes, CREATE_RESULT_ITEMS, FieldType, ResponseTypes, ResponseTypeValue} from '@src/common/constants.ts';
import {useState} from 'react';
import SaveComponent from '@src/components/admin/SaveComponent.tsx';
import InputFields from '@src/components/admin/InputFields.tsx';
import {FUEL_MAIN_NAV} from '@src/common/navigation.ts';
import {useNavigate} from 'react-router-dom';
import ResponseDialog from '@src/components/admin/ResponseDialog.tsx';
import {isFormValid, validateFields} from '@src/common/utils.ts';

export default function CreateFuelPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [result, setResult] = useState(ResponseTypes.Unknown);
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState<{[key: string]: string}>({});
  const [inputErrors, setInputErrors] = useState<{[key: string]: string}>({});

  const REQUIRED_FIELDS = [
    {
      name: 'Fuel',
      required: true,
      type: FieldType.Text,
    },
  ];

  const onSaveClick = () => {
    // Validate before sending the result
    const validationErrors = validateFields(REQUIRED_FIELDS, inputValues);
    setInputErrors(validationErrors);

    if (isFormValid(validationErrors)) {
      // TODO: Send the received data to the server
      // TODO: Depending on the receiving result, save the corresponding result
      setResult(ResponseTypes.Success);
      setOpenDialog(true);
    }
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

  const handleInputChange = (name: string, value: string) => {
    setInputValues({...inputValues, [name]: value});
  };

  // Get response message depending on the response result
  const getMessage = (key: ResponseTypeValue): string => {
    return CREATE_RESULT_ITEMS[key];
  };

  return (
    <Box sx={{m: 4, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 4}}>
      <PageHeader pageType={AdminPageTypes.Create} />
      <InputFields
        fields={REQUIRED_FIELDS}
        inputValues={inputValues}
        errors={inputErrors}
        onChange={handleInputChange}
      />
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
