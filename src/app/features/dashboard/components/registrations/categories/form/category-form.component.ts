import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/core/alert.service';
import { CategoryService } from 'src/app/core/category.service';
import { CategoryInterface } from 'src/app/features/dashboard/interfaces/category-interface';

@Component({
	selector: 'app-category-form',
	templateUrl: './category-form.component.html',
	styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
	public categories: CategoryInterface[] = [];
	public formulario!: FormGroup;
	public typeForm: boolean = false;

	constructor(
		public dialogRef: MatDialogRef<CategoryFormComponent>,
		private formBuilder: FormBuilder,
		private categoryService: CategoryService,
		private alertService: AlertService,
		@Inject(MAT_DIALOG_DATA) public data: { id?: string, category?: CategoryInterface }
	) {
	}

	ngOnInit(): void {
		this.criarFormulario();

		if (this.data && this.data.category) {
			this.typeForm = true;
			this.preencherFormulario(this.data.category);
		} else if (this.data && this.data.id) {
			this.typeForm = false;
			this.getCategoryById(this.data.id);
		}
	}

	getCategoryById(id: string) {
		this.categoryService.getCategoryById(id).subscribe({
			next: () => {

			}, error: (error: Error) => {
				this.alertService.error('error', error.message);
			}
		})
	}

	onCancelClick(): void {
		this.dialogRef.close();
	}

	onCreateClick(): void {
		if (this.formulario.valid) {
			if (this.data && this.data.id) {
				this.editCategory(this.data.id);
			} else {
				this.createCategory();
			}
		}
	}

	createCategory(): void {
		this.categoryService.createCategory(this.formulario.value).subscribe({
			next: (category: CategoryInterface) => {
				this.alertService.success('Success', 'Categoria criada com sucesso!');
				this.dialogRef.close(category);
			}, error: (error: Error) => {
				this.alertService.error('error', error.message);
			}
		})
	}

	editCategory(id: string): void {
		this.categoryService.updateCategory(id, this.formulario.value).subscribe({
			next: (category: CategoryInterface) => {
				this.alertService.success('Success', 'Categoria editada com sucesso!');
				this.dialogRef.close(category);
			}, error: (error: Error) => {
				this.alertService.error('error', error.message);
			}
		})
	}

	private criarFormulario(): void {
		this.formulario = this.formBuilder.group({
			category_name: new FormControl({ value: '', disabled: false }, [Validators.required]),
			description: new FormControl({ value: '', disabled: false }, [Validators.required]),
			category_image: new FormControl({ value: '', disabled: false }, [Validators.required]),
			category_icon: new FormControl({ value: '', disabled: false }, [Validators.required])
		});
	}

	private preencherFormulario(category: CategoryInterface): void {
		this.formulario.patchValue(category);
	}
}
