import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import {FC} from 'react';

interface ResponseDialogProps {
  isOpened: boolean;
  text: string;
  handleClose: () => void;
}

function ResponseDialog({isOpened, text, handleClose}: ResponseDialogProps) {
  return (
    <Dialog
      fullWidth
      open={isOpened}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>작업 결과</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{text}</DialogContentText>
        <DialogActions>
          <Button
            onClick={handleClose}
            autoFocus
          >
            닫기
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default ResponseDialog;
