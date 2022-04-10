import { Inject } from '@angular/core';
import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

    constructor(
        public dialogRef: MatDialogRef<DialogComponent>,
        //@Inject(MAT_DIALOG_DATA) public data: DialogData,
        private _snackBar: MatSnackBar
      ) { }

//     public showCopiedSnackBar() {        
//         this._snackBar.open('Peer ID Copied!', 'Hurrah', {
//         duration: 1000,
//         horizontalPosition: 'center',
//         verticalPosition: 'top'
//       });
//     }
 }

// export interface DialogData {
//     peerId?: string;
//     joinCall: Boolean;
// }