import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/core/alert.service';
import { ProductsService } from 'src/app/core/products.service';
import { ProductsInterface } from 'src/app/features/dashboard/interfaces/products-interface';
import { ProductsInterfaceApi } from 'src/app/features/dashboard/interfaces/products-interface-api';
import { ProductFormComponent } from '../form/product-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/modal/confirmation-dialog/confirmation-dialog.component';

@Component({
	selector: 'app-product-view',
	templateUrl: './product-view.component.html',
	styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
	loading: boolean = false;
	dataSource!: MatTableDataSource<ProductsInterface>;
	displayedColumns: string[] = ["photo", "name", "description", "price", "stock", "action"];
	@ViewChild(MatPaginator) paginatior !: MatPaginator;
	@ViewChild(MatSort) sort !: MatSort;

	constructor(
		public dialog: MatDialog,
		private productService: ProductsService,
		private alertService: AlertService
	) {
	}

	ngOnInit(): void {
		this.getAllProducts();
	}

	Filterchange(data: Event): void {
		const value = (data.target as HTMLInputElement).value;
		this.dataSource.filter = value;
	}

	getAllProducts(): void {
		this.productService.getAllProducts().subscribe({
			next: (product: ProductsInterfaceApi) => {
				this.dataSource = new MatTableDataSource<ProductsInterface>(product.data);
				console.log('this.dataSource ', this.dataSource );
			}
		})
	}

	editProduct(id: string, data: ProductsInterface): void {
		const dialogRef = this.dialog.open(ProductFormComponent, {
			width: '1200px',
			height: '400px',
			data: { id: id, product: data },
		});

		dialogRef.afterClosed().subscribe(result => {
			this.getAllProducts();
		});
	}

	deleteProduct(id: string): void {
		const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
			width: '300px',
			data: { title: 'Confirmação', message: 'Deseja realmente excluir?' }
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.productService.deleteProduct(id).subscribe({
					next: () => {
						setTimeout(() => {
							this.alertService.success('Sucesso', 'Produto excluído com sucesso!')
							this.getAllProducts();
						}, 1000)
					}, error: (err: Error) => {
						this.alertService.error('error', err.message);
					}
				})
			}
		});
	}

	createProduct(): void {
		const dialogRef = this.dialog.open(ProductFormComponent, {
			width: '1200px',
			height: '400px'
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('O novo produto foi criado:', result);
			this.getAllProducts();
		});
	}
}
