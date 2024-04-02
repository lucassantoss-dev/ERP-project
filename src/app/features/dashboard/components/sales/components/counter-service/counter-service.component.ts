import { Component, OnInit, ViewChild } from '@angular/core';
import { OpenServiceComponent } from './open-service/open-service.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
	selector: 'app-counter-service',
	templateUrl: './counter-service.component.html',
	styleUrls: ['./counter-service.component.scss']
})
export class CounterServiceComponent implements OnInit {
	openCashier: boolean = true;
	dataSource!: MatTableDataSource<any>;
	displayedColumns: string[] = ["code", "price", "paid_out", "payment", "action"];
	@ViewChild(MatPaginator) paginatior !: MatPaginator;
	@ViewChild(MatSort) sort !: MatSort;
	constructor(
		private router: Router,
		public dialog: MatDialog
	) { }

	ngOnInit(): void {

	}

	Filterchange(data: Event): void {
		const value = (data.target as HTMLInputElement).value;
		this.dataSource.filter = value;
	}

	openService(): void {
		if (this.openCashier) {
			this.router.navigate(['dashboard/cashier'])
		} else {
			const dialogRef = this.dialog.open(OpenServiceComponent, {
				width: '1200px',
				height: '480px'
			});
	
			dialogRef.afterClosed().subscribe(result => {
			});
		}
	}
}
