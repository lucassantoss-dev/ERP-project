import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as tableMock from '../shared/mocks/table-service.json';
import { TableServiceApiInterface } from '../features/dashboard/interfaces/table-service-api';
import { environment } from '../enviroments/enviroment';
import { TableServiceInterface } from '../features/dashboard/interfaces/table-service';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  public urlApi = environment.urlBackEnd
  constructor(private http: HttpClient) { }

  getTables(): Observable<TableServiceApiInterface> {
    const url = `${this.urlApi}/table`;
    return this.http.get<TableServiceApiInterface>(url);
    // return of(tableMock);
  }

  updateTable(id: string, data: TableServiceInterface): Observable<TableServiceInterface> {
    const url = `${this.urlApi}/table/${id}`;
    return this.http.put<TableServiceInterface>(url, data)
  }
}
