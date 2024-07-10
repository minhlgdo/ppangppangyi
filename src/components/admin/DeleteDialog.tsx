import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';

interface DeleteDialogProps {
  isOpened: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}

function DeleteDialog({isOpened, handleClose, handleDelete}: DeleteDialogProps) {
  return (
    <Dialog
      fullWidth
      open={isOpened}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'삭제 경고'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">선택한 항목이 삭제됩니다.</DialogContentText>
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
}

export default DeleteDialog;
