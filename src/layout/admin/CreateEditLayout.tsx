import {InputValuesType, RequiredFieldType} from '@src/common/types.ts';
import {
  AdminPageTypes,
  CREATE_RESULT_ITEMS,
  EDIT_RESULT_ITEMS,
  SubjectType,
  ResponseTypes,
  ResponseTypeValue,
} from '@src/common/constants.ts';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {isFormValid, validateFields} from '@src/common/validation-utils.ts';
import {Box} from '@mui/material';
import {PageHeader} from '@src/components/admin/PageHeader.tsx';
import InputForm from '@src/components/admin/InputForm.tsx';
import SaveComponent from '@src/components/admin/SaveComponent.tsx';
import ResponseDialog from '@src/components/admin/ResponseDialog.tsx';

interface CreateEditLayoutProps<T> {
  subject: SubjectType;
  requiredFields: RequiredFieldType<T>[];
  view: typeof AdminPageTypes.Create | typeof AdminPageTypes.Edit;
  handleSendData: (data: InputValuesType) => void; // TODO: fix the type later
}

// Helper function to initialize input values with default values
const initializeInputValues = <T,>(fields: RequiredFieldType<T>[]): InputValuesType => {
  const initialValues: InputValuesType = {};
  fields.forEach((field) => {
    if (field.defaultValue) {
      initialValues[field.name] = field.defaultValue;
    }
  });
  return initialValues;
};

export default function CreateEditLayout<T>({subject, requiredFields, view, handleSendData}: CreateEditLayoutProps<T>) {
  const [openDialog, setOpenDialog] = useState(false);
  const [result, setResult] = useState<ResponseTypeValue>(ResponseTypes.Unknown);
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState<InputValuesType>(() => initializeInputValues(requiredFields));
  const [inputErrors, setInputErrors] = useState<{[key: string]: string}>({});

  const handleSaveClick = () => {
    //
    // Validate before sending the result
    const validationErrors = validateFields(requiredFields, inputValues);
    setInputErrors(validationErrors);

    if (isFormValid(validationErrors)) {
      // TODO: Send the received data to the server
      handleSendData(inputValues);
      // TODO: Depending on the receiving result, save the corresponding result
      setResult(ResponseTypes.Success);
      setOpenDialog(true);
    }
  };

  const handleCancelClick = () => {
    navigate(-1);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    if (result === ResponseTypes.Success && view === AdminPageTypes.Create) {
      navigate(-1); // Go back to the previous page if the view is Create
    }
  };

  const handleInputChange = (name: string, value: string | number) => {
    setInputValues({...inputValues, [name]: value});
  };

  // Get response message depending on the response result
  const getMessage = (key: ResponseTypeValue): string => {
    if (view === AdminPageTypes.Create) {
      return CREATE_RESULT_ITEMS[key];
    }
    return EDIT_RESULT_ITEMS[key];
  };

  return (
    <Box sx={{m: 4, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 4}}>
      <PageHeader
        subject={subject}
        pageType={view}
      />
      <InputForm
        fields={requiredFields}
        inputValues={inputValues}
        errors={inputErrors}
        handleChange={handleInputChange}
      />
      <SaveComponent
        onSave={handleSaveClick}
        onCancel={handleCancelClick}
      />
      <ResponseDialog
        isOpened={openDialog}
        text={getMessage(result)}
        handleClose={handleDialogClose}
      />
    </Box>
  );
}
