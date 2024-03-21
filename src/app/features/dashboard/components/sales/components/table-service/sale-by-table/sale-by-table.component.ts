import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sale-by-table',
  templateUrl: './sale-by-table.component.html',
  styleUrls: ['./sale-by-table.component.scss']
})
export class SaleByTableComponent {
  constructor(
		public dialogRef: MatDialogRef<SaleByTableComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	onNoClick(): void {
		this.dialogRef.close(false);
	}

	onYesClick(): void {
		this.dialogRef.close(true);
	}
}
