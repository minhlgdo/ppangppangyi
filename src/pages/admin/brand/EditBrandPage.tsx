import {Box} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import {useState} from 'react';
import ResponseDialog from '@src/components/admin/ResponseDialog.tsx';
import {AdminPageTypes, EDIT_RESULT_ITEMS, FieldType, ResponseTypes, ResponseTypeValue} from '@src/common/constants.ts';
import {PageHeader} from '@src/components/admin/PageHeader.tsx';
import SaveComponent from '@src/components/admin/SaveComponent.tsx';
import InputFields from '@src/components/admin/InputFields.tsx';
import {isFormValid, validateFields} from '@src/common/utils.ts';

export default function EditBrandPage() {
  const {brandId} = useParams();
  const [brandName, setBrandName] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [result, setResult] = useState(ResponseTypes.Unknown);
  const [inputValues, setInputValues] = useState<{[key: string]: string}>({});
  const [inputErrors, setInputErrors] = useState<{[key: string]: string}>({});

  const navigate = useNavigate();

  const REQUIRED_INPUTS = [
    {
      name: 'Brand',
      required: true,
      type: FieldType.Text,
      defaultValue: brandName,
    },
  ];

  // TODO: load brand name

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
    navigate(`/admin/brand`); // go back to the main page
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
