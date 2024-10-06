import { MatDialogConfig } from '@angular/material/dialog';

export const DIALOG_OPTIONS_FORM: MatDialogConfig = {
  enterAnimationDuration: '500ms',
  exitAnimationDuration: '500ms',
  position: {
    top: '100px'
  },
  autoFocus:false,
  disableClose:false,
  backdropClass : 'inquiry_form',
  width:'64vw',
};

export const DIALOG_OPTIONS_FORM_TO_FILL: MatDialogConfig = {
  width: '48vw',
  minHeight:'45vh',
  maxHeight: '35vw',
  enterAnimationDuration: '500ms',
  exitAnimationDuration: '500ms',
  position: {
    top: '100px'
  },
  autoFocus:false
};
