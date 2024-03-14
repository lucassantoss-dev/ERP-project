import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as tableMock from '../shared/mocks/table-service.json';
import { TableServiceApiInterface } from '../features/dashboard/interfaces/table-service-api';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  constructor(private http: HttpClient) { }

  getTables(): Observable<TableServiceApiInterface> {
    // return this.http.get<TableServiceInterface[]>(listTable as unknown as string);
    return of(tableMock);
  }
}
