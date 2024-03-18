import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/core/alert.service';
import { CategoryService } from 'src/app/core/category.service';
import { CategoryInterface } from 'src/app/features/dashboard/interfaces/category-interface';
import { CategoryInterfaceApi } from 'src/app/features/dashboard/interfaces/category-interface-api';
import { CategoryFormComponent } from '../form/category-form.component';
import { ConfirmationDialogComponent } from 'src/app/shared/modal/confirmation-dialog/confirmation-dialog.component';

@Component({
	selector: 'app-category-view',
	templateUrl: './category-view.component.html',
	styleUrls: ['./category-view.component.scss']
})
export class CategoryViewComponent implements OnInit {
	loading: boolean = false;
	dataSource!: MatTableDataSource<CategoryInterface>;
	displayedColumns: string[] = ["photo", "name", "description", "action"];
	@ViewChild(MatPaginator) paginatior !: MatPaginator;
	@ViewChild(MatSort) sort !: MatSort;

	constructor(
		public dialog: MatDialog,
		private alertService: AlertService,
		private categoryService: CategoryService
	) {
	}

	ngOnInit(): void {
		this.getAllCategories();
	}

	Filterchange(data: Event): void {
		const value = (data.target as HTMLInputElement).value;
		this.dataSource.filter = value;
	}

	getAllCategories(): void {
		this.categoryService.getAllCategories().subscribe({
			next: (category: CategoryInterfaceApi) => {
				this.dataSource = new MatTableDataSource<CategoryInterface>(category.data);
			}
		})
	}

	editCategory(id: string, data: CategoryInterface): void {
		const dialogRef = this.dialog.open(CategoryFormComponent, {
			width: '1200px',
			height: '400px',
			data: { id: id, category: data },
		});

		dialogRef.afterClosed().subscribe(result => {
			this.getAllCategories();
		});
	}

	deleteCategory(id: string): void {
		const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
			width: '300px',
			data: { title: 'Confirmação', message: 'Deseja realmente excluir?' }
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.categoryService.deleteCategory(id).subscribe({
					next: () => {
						this.alertService.success('Sucesso', 'Categoria excluído com sucesso!')
						this.getAllCategories();
					}, error: (err: Error) => {
						this.alertService.error('error', err.message);
					}
				})
			}
		});
	}

	createCategory(): void {
		const dialogRef = this.dialog.open(CategoryFormComponent, {
			width: '1200px',
			height: '200px'
		});

		dialogRef.afterClosed().subscribe(result => {
			this.getAllCategories();
		});
	}
}
