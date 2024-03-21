import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/core/category.service';
import { ProductsService } from 'src/app/core/products.service';
import { CategoryInterface } from 'src/app/features/dashboard/interfaces/category-interface';
import { CategoryInterfaceApi } from 'src/app/features/dashboard/interfaces/category-interface-api';
import { ProductsInterface } from 'src/app/features/dashboard/interfaces/products-interface';
import { ProductsInterfaceApi } from 'src/app/features/dashboard/interfaces/products-interface-api';

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
		private categoryService: CategoryService,
		private productService: ProductsService,
		public dialogRef: MatDialogRef<CustomDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public tableId: string
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
		const selectedItemsWithCount  = this.selectedItems.filter(item => item.selectedItemCount > 0);
		const itemIds = selectedItemsWithCount.flatMap(item => {
			return Array.from({ length: item.selectedItemCount }, () => item._id);
		});
		const query = {
			tableId: this.tableId,
			itensSale: itemIds
		}
	}

	onCancel(): void {
		this.dialogRef.close('Cancelar');
	}

	onClose(): void {
		this.dialogRef.close('Fechar conta');
	}
}
