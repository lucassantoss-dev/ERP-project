import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SupplierService } from 'src/app/core/supplier.service';
import { SupplierInterface } from 'src/app/features/dashboard/interfaces/supplier-interface';
import { SupplierApiInterface } from 'src/app/features/dashboard/interfaces/supplier-interface-api';
import { SuppliersFormComponent } from '../form/suppliers-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/modal/confirmation-dialog/confirmation-dialog.component';
import { AlertService } from 'src/app/core/alert.service';

@Component({
	selector: 'app-suppliers-view',
	templateUrl: './suppliers-view.component.html',
	styleUrls: ['./suppliers-view.component.scss']
})
export class SuppliersViewComponent implements OnInit {
	loading: boolean = false;
	dataSource!: MatTableDataSource<SupplierInterface>;
	displayedColumns: string[] = ["name", "cnpj", "phone", "address", "action"];
	@ViewChild(MatPaginator) paginatior !: MatPaginator;
	@ViewChild(MatSort) sort !: MatSort;

	constructor(
		public dialog: MatDialog,
		private supplierService: SupplierService,
		private alertService: AlertService
	) {
	}

	ngOnInit(): void {
		this.getSupplier();
	}

	Filterchange(data: Event): void {
		const value = (data.target as HTMLInputElement).value;
		this.dataSource.filter = value;
	}

	getSupplier(): void {
		this.loading = true;
		this.supplierService.getSupplier().subscribe((supplier: SupplierApiInterface) => {
			setTimeout(() => {
				this.dataSource = new MatTableDataSource<SupplierInterface>(supplier.data);
				this.loading = false;
			}, 1000)
		})
	}

	addSupplier(): void {
		const dialogRef = this.dialog.open(SuppliersFormComponent, {
			width: '1200px',
			height: '400px'
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('O novo fornecedor foi criado:', result);
			this.getSupplier();
		});
	}

	editSupplier(id: string, data: SupplierInterface): void {
		const dialogRef = this.dialog.open(SuppliersFormComponent, {
			width: '1200px',
			height: '400px',
			data: { id: id, supplier: data },
		});

		dialogRef.afterClosed().subscribe(result => {
			this.getSupplier();
		});
	}

	deleteSupplier(id: string): void {
		const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
			width: '300px',
			data: { title: 'Confirmação', message: 'Deseja realmente excluir?' }
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.supplierService.deleteProvider(id).subscribe({
					next: () => {
						setTimeout(() => {
							this.alertService.success('Sucesso', 'Fornecedor excluído com sucesso!')
							this.getSupplier();
						}, 1000)
					}, error: (err: Error) => {
						this.alertService.error('error', err.message);
					}
				})
			}
		});
	}
}
