import {FC} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';

interface DeleteDialogProps {
  isOpened: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}

const DeleteDialog: FC<DeleteDialogProps> = ({isOpened, handleClose, handleDelete}) => {
  return (
    <Dialog
      open={isOpened}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'항목을 삭제하고 십습니까?'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">취소할 수 없습니다.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        <Button
          onClick={handleDelete}
          autoFocus
        >
          삭제
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
