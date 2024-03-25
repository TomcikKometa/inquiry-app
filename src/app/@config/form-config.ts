import { MatDialogConfig } from '@angular/material/dialog';

export const DIALOG_OPTIONS_FORM: MatDialogConfig = {
  width: '48vw',
  maxHeight: '34vw',
  enterAnimationDuration: '500ms',
  exitAnimationDuration: '500ms',
  position: {
    top: '100px'
  },
  autoFocus:false
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
