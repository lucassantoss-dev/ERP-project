import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-open-service',
	templateUrl: './open-service.component.html',
	styleUrls: ['./open-service.component.scss']
})
export class OpenServiceComponent implements OnInit {
	public formulario!: FormGroup;
	constructor(
		private formBuilder: FormBuilder,
		public dialogRef: MatDialogRef<OpenServiceComponent>,
	) {
	}
	ngOnInit(): void {
		this.criarFormulario();
	}

	onCancelClick(): void {
		this.dialogRef.close();
	}

	onCreateClick(): void {

	}

	private criarFormulario(): void {
		this.formulario = this.formBuilder.group({
			order_id: new FormControl({ value: '', disabled: false }, [Validators.required]),
			date: new FormControl({ value: '', disabled: false }, [Validators.required]),
			client_name: new FormControl({ value: '', disabled: false }, [Validators.required]),
			operation: new FormControl({ value: '', disabled: false }, [Validators.required])
		});
	}
}
