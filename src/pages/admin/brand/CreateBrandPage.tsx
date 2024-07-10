import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  AdminPageTypes,
  CREATE_RESULT_ITEMS,
  FieldType,
  RequiredFieldType,
  ResponseTypes,
  ResponseTypeValue,
} from '@src/common/constants.ts';
import {Box} from '@mui/material';
import ResponseDialog from '@src/components/admin/ResponseDialog.tsx';
import {PageHeader} from '@src/components/admin/PageHeader.tsx';
import SaveComponent from '@src/components/admin/SaveComponent.tsx';
import InputFields from '@src/components/admin/InputFields.tsx';
import {isFormValid, validateFields} from '@src/common/utils.ts';

const MAIN_BRAND_PAGE = `/admin/brand`;

export default function CreateBrandPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [result, setResult] = useState(ResponseTypes.Unknown);
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState<{[key: string]: string}>({});
  const [inputErrors, setInputErrors] = useState<{[key: string]: string}>({});

  const REQUIRED_INPUTS: RequiredFieldType[] = [
    {
      name: 'Brand',
      required: true,
      type: FieldType.Text,
    },
  ];

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
    navigate(MAIN_BRAND_PAGE); // go back to the main page
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    if (result === ResponseTypes.Success) {
      navigate(MAIN_BRAND_PAGE);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setInputValues({...inputValues, [name]: value});
  };

  const getMessage = (key: ResponseTypeValue): string => {
    return CREATE_RESULT_ITEMS[key];
  };

  return (
    <Box sx={{m: 4, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 4}}>
      <PageHeader pageType={AdminPageTypes.Create} />
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
