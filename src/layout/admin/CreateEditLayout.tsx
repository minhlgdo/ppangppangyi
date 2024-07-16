import {InputValuesType, RequiredFieldType} from '@src/common/types.ts';
import {
  AdminPageTypes,
  CREATE_RESULT_ITEMS,
  EDIT_RESULT_ITEMS,
  ResponseTypes,
  ResponseTypeValue,
  SubjectType,
} from '@src/common/constants.ts';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {isFormValid, validateFields} from '@src/common/validation-utils.ts';
import {Box} from '@mui/material';
import {PageHeader} from '@src/components/admin/PageHeader.tsx';
import InputForm from '@src/components/admin/InputForm.tsx';
import SaveComponent from '@src/components/admin/SaveComponent.tsx';
import ResponseDialog from '@src/components/admin/ResponseDialog.tsx';
import {useInputErrors, useInputValues} from '@src/context/AdminCreateEditContext.tsx';

interface CreateEditLayoutProps {
  subject: SubjectType;
  requiredFields: RequiredFieldType[];
  view: typeof AdminPageTypes.Create | typeof AdminPageTypes.Edit;
  handleSendData: (data: InputValuesType) => void; // TODO: fix the type later
}

// Helper function to initialize input values with default values
const initializeInputValues = (fields: RequiredFieldType[]): InputValuesType => {
  const initialValues: InputValuesType = {};
  fields.forEach((field) => {
    if (field.defaultValue) {
      if (Array.isArray(field.defaultValue)) {
        // map the default value with index
        initialValues[field.name] = field.defaultValue.map((v) => v.key);
      } else {
        initialValues[field.name] = field.defaultValue;
      }
    }
  });
  return initialValues;
};

export default function CreateEditLayout({subject, requiredFields, view, handleSendData}: CreateEditLayoutProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [result, setResult] = useState<ResponseTypeValue>(ResponseTypes.Unknown);
  const navigate = useNavigate();
  const {inputValues, setInputValues} = useInputValues();
  const {setInputErrors} = useInputErrors();

  // Initialize the values of inputValues using requiredFields. only load when the component mounts
  useEffect(() => {
    setInputValues(initializeInputValues(requiredFields));
    // eslint-disable-next-line
  }, []);

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
      <InputForm fields={requiredFields} />
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
