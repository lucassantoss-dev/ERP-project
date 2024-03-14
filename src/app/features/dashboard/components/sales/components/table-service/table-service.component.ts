import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/core/table.service';
import { TableServiceInterface } from 'src/app/features/login/interfaces/table-service';

@Component({
	selector: 'app-table-service',
	templateUrl: './table-service.component.html',
	styleUrls: ['./table-service.component.scss']
})
export class TableServiceComponent implements OnInit {
	public tableInterface: TableServiceInterface[] = [];

	constructor(private tableService: TableService) { }

	ngOnInit(): void {
		this.tableService.getTables().subscribe(tables => {
			console.log('tables', tables);
		})
	}
}
