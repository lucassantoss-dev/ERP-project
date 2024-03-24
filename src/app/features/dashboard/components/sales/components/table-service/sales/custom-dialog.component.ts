import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/core/category.service';
import { ProductsService } from 'src/app/core/products.service';
import { SaleService } from 'src/app/core/sale.service';
import { AddItemInterface } from 'src/app/features/dashboard/interfaces/add-item.interface';
import { CategoryInterface } from 'src/app/features/dashboard/interfaces/category-interface';
import { CategoryInterfaceApi } from 'src/app/features/dashboard/interfaces/category-interface-api';
import { ProductsInterface } from 'src/app/features/dashboard/interfaces/products-interface';
import { ProductsInterfaceApi } from 'src/app/features/dashboard/interfaces/products-interface-api';
import { TableServiceInterface } from 'src/app/features/dashboard/interfaces/table-service';
import { SaleByTableComponent } from '../sale-by-table/sale-by-table.component';
import { AlertService } from 'src/app/core/alert.service';

@Component({
	selector: 'app-custom-dialog',
	templateUrl: './custom-dialog.component.html',
	styleUrls: ['./custom-dialog.component.scss']
})
export class CustomDialogComponent implements OnInit {
	selectedItems: ProductsInterface[] = [];
	categories: { categoryId: string; products: ProductsInterface[]; }[] = [];
	allCategories: CategoryInterface[] = [];
	constructor(
		public alertService: AlertService,
		public dialog: MatDialog,
		private saleService: SaleService,
		private categoryService: CategoryService,
		private productService: ProductsService,
		public dialogRef: MatDialogRef<CustomDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public tableId: TableServiceInterface
	) {
	}

	ngOnInit(): void {
		this.getAllProducts();
		this.loadCategories();
		console.log('title', this.tableId)
	}

	loadCategories(): void {
		this.categoryService.getAllCategories().subscribe((categories: CategoryInterfaceApi) => {
			this.allCategories = categories.data;
		});
	}

	getAllProducts(): void {
		this.productService.getAllProducts().subscribe({
			next: (product: ProductsInterfaceApi) => {
				product.data.forEach(product => product.selectedItemCount = 0);
				const groupedProducts = new Map<string, ProductsInterface[]>();
				product.data.forEach(product => {
					if (!groupedProducts.has(product.categoryId)) {
						groupedProducts.set(product.categoryId, []);
					}
					groupedProducts.get(product.categoryId)?.push(product)
				})

				this.categories = Array.from(groupedProducts).map(([categoryId, products]) => ({
					categoryId,
					products
				}))
			}
		})
	}

	getCategoryName(categoryId: string): string {
		const category = this.allCategories.find(cat => cat._id === categoryId);
		return category ? category.category_name : 'Categoria Desconhecida';
	}

	increaseItemCount(product: ProductsInterface): void {
		product.selectedItemCount++;
		if (!this.selectedItems.includes(product)) {
			this.selectedItems.push(product);
		}
	}

	decreaseItemCount(product: ProductsInterface): void {
		if (product.selectedItemCount > 0) {
			product.selectedItemCount--;
		}
	}

	onCreateOrder(): void {
		const selectedItemsWithCount = this.selectedItems.filter(item => item.selectedItemCount > 0);
		const itemIds = selectedItemsWithCount.flatMap(item => {
			return Array.from({ length: item.selectedItemCount }, () => item._id);
		});
		const query: AddItemInterface = {
			tableId: this.tableId.tableId,
			itensSale: itemIds
		}
		this.saleService.addItemInTable(query).subscribe({
			next: () => {
				this.alertService.success('Success', 'Pedido criado!')
				this.dialogRef.close('Cancelar');
			}
		})
	}

	onSaleAccount(): void {
		this.saleService.getAccountByTable(this.tableId.tableId).subscribe({
			next: (result) => {
				const dialogRef = this.dialog.open(SaleByTableComponent, {
					width: '300px',
					height: '700px',
					data: { title: 'Conta parcial', tableId: this.tableId }
				});
				console.log('reslt', result);
		
				dialogRef.afterClosed().subscribe(result => {
					if (result) {
					}
				});
				this.dialogRef.close('Cancelar');
			}
		})
	}

	onCancel(): void {
		this.dialogRef.close('Cancelar');
	}

	onClose(): void {
		this.dialogRef.close('Fechar conta');
	}
}
