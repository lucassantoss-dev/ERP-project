import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TableServiceInterface } from '../features/login/interfaces/table-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private ordersSubject = new BehaviorSubject<TableServiceInterface[]>([]);
  tables$ = this.ordersSubject.asObservable();
  constructor(private http: HttpClient) { }

  getTables(): Observable<TableServiceInterface[]> {
    return this.http.get<TableServiceInterface[]>('url')
  }
}
