import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/core/alert.service';
import { TableService } from 'src/app/core/table.service';
import { TableServiceInterface } from 'src/app/features/dashboard/interfaces/table-service';
import { TableServiceApiInterface } from 'src/app/features/dashboard/interfaces/table-service-api';
import { ConfirmationDialogComponent } from 'src/app/shared/modal/confirmation-dialog/confirmation-dialog.component';
import { CustomDialogComponent } from 'src/app/shared/modal/custom-dialog/custom-dialog.component';

@Component({
	selector: 'app-table-service',
	templateUrl: './table-service.component.html',
	styleUrls: ['./table-service.component.scss']
})
export class TableServiceComponent implements OnInit {
	public tableInterface: TableServiceInterface[] = [];

	constructor(
		private tableService: TableService,
		public dialog: MatDialog,
		private alertService: AlertService
	) { }

	ngOnInit(): void {
		this.loadTables();
	}

	loadTables() {
		this.tableService.getTables().subscribe(
			(tables: TableServiceApiInterface) => {
				this.tableInterface = tables.data;
			},
			(error) => {
				console.error('Error loading tables:', error);
			}
		);
	}

	createOrdens(data: TableServiceInterface): void {
		if (data.status) {
			this.openReservation(data);
		} else {
			this.openOrders();
		}
	}

	openReservation(data: TableServiceInterface): void {
		const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
			width: '300px',
			data: { title: 'Confirmação', message: 'Deseja ocupar essa mesa?' }
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				data.status = false;
				console.log('data', data);
				this.alertService.success('Sucesso', 'Mesa ocupada, anote os pedidos!')
				setTimeout(() => {
					this.openOrders();
				}, 2000)
			}
		});
	}

	openOrders(): void {
		const dialogRef = this.dialog.open(CustomDialogComponent, {
			width: '1200px',
			data: {
				title: 'Criar pedidos',
				cards: [
					{ title: 'Cardápio', description: 'Descrição de cardápio' },
				],
				buttons: [
					{ label: 'Criar pedido', action: 'action1' },
					{ label: 'Cancelar', action: 'action2' }
				]
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('Dialog closed with result:', result);
		});
	}
}
