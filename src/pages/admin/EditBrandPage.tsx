import {Box, Button, Stack, TextField, Typography} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import {useState} from 'react';
import ResponseDialog from '@src/components/admin/ResponseDialog.tsx';
import {AdminPageTypes, EDIT_RESULT_ITEMS, EditResultKey, RESPONSES, ResponseType} from '@src/common/constants.ts';
import {PageHeader} from '@src/components/admin/PageHeader.tsx';
import SaveComponent from '@src/components/admin/SaveComponent.tsx';
import InputFields, {FieldType} from '@src/components/admin/InputFields.tsx';

export default function EditBrandPage() {
  const {brandId} = useParams();
  const [brandName, setBrandName] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [result, setResult] = useState<ResponseType>('UNKNOWN');
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
    // TODO: handle update call here
    // TODO: depending on the result value, show the response
    setOpenDialog(true);
    setResult(RESPONSES[0]);
  };
  const onCancelClick = () => {
    navigate(`/admin/brand`); // go back to the main page
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const getMessage = (key: EditResultKey): string => {
    return EDIT_RESULT_ITEMS[key];
  };

  return (
    <Box sx={{m: 4, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 4}}>
      <PageHeader pageType={AdminPageTypes.Edit} />
      <InputFields fields={REQUIRED_INPUTS} />
      <SaveComponent
        onSave={onSaveClick}
        onCancel={onCancelClick}
      />

      <ResponseDialog
        isOpened={openDialog}
        text={getMessage(result as EditResultKey)}
        handleClose={handleDialogClose}
      />
    </Box>
  );
}
