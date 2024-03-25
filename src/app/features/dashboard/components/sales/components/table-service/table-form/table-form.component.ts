import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/core/alert.service';
import { TableService } from 'src/app/core/table.service';

@Component({
  selector: 'app-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.scss']
})
export class TableFormComponent implements OnInit {
  public categories: any[] = [];
	public formulario!: FormGroup;
	public typeForm: boolean = false;

  constructor(
		public dialogRef: MatDialogRef<TableFormComponent>,
		private formBuilder: FormBuilder,
		private alertService: AlertService,
    private tableService: TableService,
	) {
	}

  ngOnInit(): void {
    this.criarFormulario();
  }

  onCancelClick(): void {
		this.dialogRef.close();
	}

	onCreateClick(): void {
		if (this.formulario.valid) {
			this.tableService.createTable(this.formulario.value).subscribe({
        next: () => {
          this.alertService.success('Success', 'Mesa criada com sucesso!');
          this.dialogRef.close();
        }
      })
		}
	}

  private criarFormulario(): void {
		this.formulario = this.formBuilder.group({
			table_number: new FormControl({ disabled: false }, [Validators.required]),
			table_status: new FormControl({ value: false, disabled: false }, [Validators.required]),
		});
	}
}
