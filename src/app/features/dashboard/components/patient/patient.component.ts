import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent {
  displayedColumns: string[] = ['name', 'cpf', 'city', 'status'];
  dataSource = new MatTableDataSource<any>([
    { name: 'João', cpf: '123.456.789-00', city: 'São Paulo', status: 'Ativo' },
    { name: 'Maria', cpf: '987.654.321-00', city: 'Rio de Janeiro', status: 'Inativo' },
    // Adicione mais dados conforme necessário
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
