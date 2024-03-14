import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-custom-dialog',
	templateUrl: './custom-dialog.component.html',
	styleUrls: ['./custom-dialog.component.scss']
})
export class CustomDialogComponent {
	constructor(
		public dialogRef: MatDialogRef<CustomDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	onButtonClick(action: string): void {
		this.dialogRef.close(action);
	}
}
