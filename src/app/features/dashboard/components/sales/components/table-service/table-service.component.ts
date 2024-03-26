import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/core/alert.service';
import { TableService } from 'src/app/core/table.service';
import { TableServiceInterface } from 'src/app/features/dashboard/interfaces/table-service';
import { TableServiceApiInterface } from 'src/app/features/dashboard/interfaces/table-service-api';
import { ConfirmationDialogComponent } from 'src/app/shared/modal/confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';
import { TableFormComponent } from './table-form/table-form.component';
import { CustomDialogComponent } from './sales/custom-dialog.component';

@Component({
	selector: 'app-table-service',
	templateUrl: './table-service.component.html',
	styleUrls: ['./table-service.component.scss']
})
export class TableServiceComponent implements OnInit {
	public tableInterface: TableServiceInterface[] = [];
	public loading: boolean = false;

	constructor(
		private tableService: TableService,
		public dialog: MatDialog,
		private alertService: AlertService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.loadTables();
	}

	loadTables() {
		this.loading = true;
		this.tableService.getTables().subscribe(
			(tables: TableServiceApiInterface) => {
				setTimeout(() => {
					this.loading = false;
					this.tableInterface = tables.data;
				}, 1000)
			},
			(error) => {
				this.alertService.error('error', error.message);
			}
		);
	}

	createOrdens(data: TableServiceInterface): void {
		if (!data.table_status) {
			this.openReservation(data);
		} else {
			this.openOrders(data);
		}
	}

	openReservation(data: TableServiceInterface): void {
		const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
			width: '300px',
			data: { title: 'Confirmação', message: 'Deseja ocupar essa mesa?' }
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				data.table_status = true;
				this.tableService.updateTable(data._id, data).subscribe({
					next: () => {
						this.alertService.success('Sucesso', 'Mesa ocupada, anote os pedidos!')
						setTimeout(() => {
							this.openOrders(data);
						}, 2000)
					}, error: (error: Error) => {
						this.alertService.error('error', error.message);
					}
				})
			}
		});
	}

	getAllProducts(): void {
	}

	createReservation(): void {
		this.router.navigate(['dashboard/reservation'])
	}

	openOrders(data: TableServiceInterface): void {
		const dialogRef = this.dialog.open(CustomDialogComponent, {
			width: '1200px',
			data: {
				tableId: data._id
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('Dialog closed with result:', result);
		});
	}

	createTable(): void {
		const dialogRef = this.dialog.open(TableFormComponent, {
			width: '300px',
			height: '200px'
		});

		dialogRef.afterClosed().subscribe(result => {
			this.loadTables();
		});
	}
}

