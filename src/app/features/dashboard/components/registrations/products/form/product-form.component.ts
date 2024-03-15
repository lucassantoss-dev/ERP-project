import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/core/alert.service';
import { ProductsService } from 'src/app/core/products.service';
import { SupplierService } from 'src/app/core/supplier.service';
import { ProductsInterface } from 'src/app/features/dashboard/interfaces/products-interface';
import { SupplierInterface } from 'src/app/features/dashboard/interfaces/supplier-interface';
import { SupplierApiInterface } from 'src/app/features/dashboard/interfaces/supplier-interface-api';

@Component({
	selector: 'app-product-form',
	templateUrl: './product-form.component.html',
	styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
	public suppliers: SupplierInterface[] = [];
	public formulario!: FormGroup;
	public typeForm: boolean = false;
	constructor(
		public dialogRef: MatDialogRef<ProductFormComponent>,
		private formBuilder: FormBuilder,
		private productsService: ProductsService,
		private alertService: AlertService,
		private supplierService: SupplierService,
		@Inject(MAT_DIALOG_DATA) public data: { id?: string, product?: ProductsInterface }
	) {
	}


	ngOnInit(): void {
		this.criarFormulario();
		this.getSupplier();

		if (this.data && this.data.product) {
			this.typeForm = true;
			this.preencherFormulario(this.data.product);
		} else if (this.data && this.data.id) {
			this.typeForm = false;
			this.getProductById(this.data.id);
		}
	}

	getSupplier(): void {
		this.supplierService.getSupplier().subscribe((supplier: SupplierApiInterface) => {
			setTimeout(() => {
				this.suppliers = supplier.data
			}, 1000)
		})
	}


	onCancelClick(): void {
		this.dialogRef.close();
	}

	onCreateClick(): void {
		if (this.formulario.valid) {
			if (this.data && this.data.id) {
				this.editProduct(this.data.id);
			} else {
				this.createProduct();
			}
		}
	}

	getProductById(id: string): void {
		this.productsService.getProductById(id).subscribe({
			next: () => {

			}, error: (err: Error) => {
				this.alertService.error('error', err.message);
			}
		})
	}

	createProduct(): void {
		this.productsService.createProduct(this.formulario.value).subscribe({
			next: (product: ProductsInterface) => {

			}, error: (error: Error) => {
				this.alertService.error('error', error.message);
			}
		})
	}

	editProduct(id: string): void {
		this.productsService.updateProduct(id, this.formulario.value).subscribe({
			next: () => {

			}, error: (error: Error) => {
				this.alertService.error('error', error.message);
			}
		})
	}

	
	private criarFormulario(): void {
		this.formulario = this.formBuilder.group({
			name: new FormControl({ value: '', disabled: false }, [Validators.required]),
			description: new FormControl({ value: '', disabled: false }, [Validators.required]),
			price: new FormControl({ disabled: false }, [Validators.required]),
			productStock: new FormControl({ disabled: false }, [Validators.required]),
			categoryId: new FormControl({ value: '', disabled: false }, [Validators.required]),
			provider: new FormControl({ value: '', disabled: false }, [Validators.required]),
			image: new FormControl({ value: '', disabled: false }, [Validators.required]),
			attributes: new FormControl({ value: '', disabled: false }, [Validators.required]),
			active: new FormControl({ value: true, disabled: false }, [Validators.required])
		});
	}

	private preencherFormulario(product: ProductsInterface): void {
		this.formulario.patchValue(product);
	}
}
