import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AdminPageTypes, CREATE_RESULT_ITEMS, ResponseTypes, ResponseTypeValue} from '@src/common/constants.ts';
import {Box} from '@mui/material';
import ResponseDialog from '@src/components/admin/ResponseDialog.tsx';
import {PageHeader} from '@src/components/admin/PageHeader.tsx';
import SaveComponent from '@src/components/admin/SaveComponent.tsx';
import InputFields, {FieldType} from '@src/components/admin/InputFields.tsx';

const MAIN_BRAND_PAGE = `/admin/brand`;

export default function CreateBrandPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [result, setResult] = useState(ResponseTypes.Unknown);
  const navigate = useNavigate();

  const REQUIRED_INPUTS = [
    {
      name: 'Brand',
      required: true,
      type: FieldType.Text,
    },
  ];

  const onSaveClick = () => {
    // TODO: Handle save result
    // TODO: Depending on the result, save the corresponding result
    setResult(ResponseTypes.Success);
    setOpenDialog(true);
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

  const getMessage = (key: ResponseTypeValue): string => {
    return CREATE_RESULT_ITEMS[key];
  };

  return (
    <Box sx={{m: 4, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 4}}>
      <PageHeader pageType={AdminPageTypes.Create} />
      <InputFields fields={REQUIRED_INPUTS} />
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
