import {useNavigate, useParams} from 'react-router-dom';
import {useState} from 'react';
import {AdminPageTypes, EDIT_RESULT_ITEMS, FieldType, ResponseTypes, ResponseTypeValue} from '@src/common/constants.ts';
import {isFormValid, validateFields} from '@src/common/utils.ts';
import {Box} from '@mui/material';
import {PageHeader} from '@src/components/admin/PageHeader.tsx';
import InputFields from '@src/components/admin/InputFields.tsx';
import SaveComponent from '@src/components/admin/SaveComponent.tsx';
import ResponseDialog from '@src/components/admin/ResponseDialog.tsx';
import {FUEL_MAIN_NAV} from '@src/common/navigation.ts';

export default function EditFuelPage() {
  const {fueldId} = useParams();
  const [fuelName, setFuelName] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [result, setResult] = useState(ResponseTypes.Unknown);
  const [inputValues, setInputValues] = useState<{[key: string]: string}>({});
  const [inputErrors, setInputErrors] = useState<{[key: string]: string}>({});

  const navigate = useNavigate();

  const REQUIRED_INPUTS = [
    {
      name: '연류',
      required: true,
      type: FieldType.Text,
      defaultValue: fuelName,
    },
  ];

  // TODO: load fuel name

  const onSaveClick = () => {
    const validationErrors = validateFields(REQUIRED_INPUTS, inputValues);
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
  };

  const getMessage = (key: ResponseTypeValue): string => {
    return EDIT_RESULT_ITEMS[key];
  };

  const handleInputChange = (name: string, value: string) => {
    setInputValues({...inputValues, [name]: value});
  };

  return (
    <Box sx={{m: 4, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 4}}>
      <PageHeader pageType={AdminPageTypes.Edit} />
      <InputFields
        fields={REQUIRED_INPUTS}
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
