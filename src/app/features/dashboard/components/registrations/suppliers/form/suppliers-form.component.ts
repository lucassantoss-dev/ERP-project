import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/core/alert.service';
import { SupplierService } from 'src/app/core/supplier.service';
import { SupplierInterface } from 'src/app/features/dashboard/interfaces/supplier-interface';

@Component({
	selector: 'app-suppliers-form',
	templateUrl: './suppliers-form.component.html',
	styleUrls: ['./suppliers-form.component.scss']
})
export class SuppliersFormComponent implements OnInit {
	public formulario!: FormGroup;
	public typeForm: boolean = false;
	constructor(
		public dialogRef: MatDialogRef<SuppliersFormComponent>,
		private formBuilder: FormBuilder,
		private supplierService: SupplierService,
		private alertService: AlertService,
		@Inject(MAT_DIALOG_DATA) public data: { id?: string, supplier?: SupplierInterface }
	) {
	}

	ngOnInit(): void {
		this.criarFormulario();

		if (this.data && this.data.supplier) {
			this.typeForm = true;
			this.preencherFormulario(this.data.supplier);
		} else if (this.data && this.data.id) {
			this.typeForm = false;
			this.getProviderById(this.data.id);
		}
	}

	private criarFormulario(): void {
		this.formulario = this.formBuilder.group({
			name: new FormControl({ value: '', disabled: false }, [Validators.required]),
			cnpj: new FormControl({ disabled: false }, [Validators.required]),
			corporate_name: new FormControl({ value: '', disabled: false }, [Validators.required]),
			fantasy_name: new FormControl({ value: '', disabled: false }, [Validators.required]),
			phone_number: new FormControl({ disabled: false }, [Validators.required]),
			postal_code: new FormControl({ value: '', disabled: false }, [Validators.required]),
			address: new FormControl({ value: '', disabled: false }, [Validators.required]),
			address_number: new FormControl({ disabled: false }, [Validators.required]),
			province: new FormControl({ value: '', disabled: false }, [Validators.required]),
			city: new FormControl({ value: '', disabled: false }, [Validators.required]),
			uf: new FormControl({ value: '', disabled: false }, [Validators.required]),
			active: new FormControl({ value: true, disabled: false }, [Validators.required])
		});
	}

	onCancelClick(): void {
		this.dialogRef.close();
	}

	onCreateClick(): void {
		if (this.formulario.valid) {
			if (this.data && this.data.id) {
				this.editSupplier(this.data.id);
			} else {
				this.createSupplier();
			}
		}
	}

	createSupplier(): void {
		this.supplierService.createProvider(this.formulario.value).subscribe({
			next: (data: SupplierInterface) => {
				this.alertService.success('Sucess', 'Fornecedor criado com sucesso!');
				this.dialogRef.close(data);
			}, error: (err: Error) => {
				this.alertService.error('error', err.message);
			}
		})
	}

	editSupplier(id: string): void {
		this.supplierService.updateProvider(id, this.formulario.value).subscribe({
			next: (data: SupplierInterface) => {
				this.alertService.success('Sucesso', 'Fornecedor atualizado com sucesso!');
				this.dialogRef.close(data);
			},
			error: (err: Error) => {
				this.alertService.error('error', err.message);
			}
		});
	}

	getProviderById(id: string): void {
		this.supplierService.getProviderById(id).subscribe({
			next: (data: SupplierInterface) => {
				
			}, error: (err: Error) => {
				this.alertService.success('error', err.message)
			}
		})
	}

	private preencherFormulario(supplier: SupplierInterface): void {
		this.formulario.patchValue(supplier);
	}
}
