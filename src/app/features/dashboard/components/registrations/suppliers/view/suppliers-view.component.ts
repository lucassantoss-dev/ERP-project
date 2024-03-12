import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-suppliers-view',
  templateUrl: './suppliers-view.component.html',
  styleUrls: ['./suppliers-view.component.scss']
})
export class SuppliersViewComponent {

  dataSource: any;
  displayedColumns: string[] = ["name", "email", "phone", "status", "action"];
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor() {
  }

  Filterchange(data: Event): void {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  addSupplier(): void {
    
  }
}
