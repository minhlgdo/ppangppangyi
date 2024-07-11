import {RequiredFieldType} from '@src/common/types.ts';
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
import InputFields from '@src/components/admin/InputFields.tsx';
import SaveComponent from '@src/components/admin/SaveComponent.tsx';
import ResponseDialog from '@src/components/admin/ResponseDialog.tsx';

interface CreateEditLayoutProps {
  subject: SubjectType;
  requiredFields: RequiredFieldType[];
  view: typeof AdminPageTypes.Create | typeof AdminPageTypes.Edit;
  handleSendData: () => void; // TODO: fix the type later
}

export default function CreateEditLayout({subject, requiredFields, view, handleSendData}: CreateEditLayoutProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [result, setResult] = useState<ResponseTypeValue>(ResponseTypes.Unknown);
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState<{[key: string]: string}>({});
  const [inputErrors, setInputErrors] = useState<{[key: string]: string}>({});

  const handleSaveClick = () => {
    // Validate before sending the result
    const validationErrors = validateFields(requiredFields, inputValues);
    setInputErrors(validationErrors);

    if (isFormValid(validationErrors)) {
      // TODO: Send the received data to the server
      handleSendData();
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

  const handleInputChange = (name: string, value: string) => {
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
      <InputFields
        fields={requiredFields}
        inputValues={inputValues}
        errors={inputErrors}
        onChange={handleInputChange}
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
