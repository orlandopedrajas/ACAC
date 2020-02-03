import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-edit-user-details-dialog',
    templateUrl: './edit-user-details.component.html',
    styleUrls: ['./edit-user-details.component.css']
})
export class EditUserDetailsDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<EditUserDetailsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public message: string) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
