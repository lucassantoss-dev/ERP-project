import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroment';
import { AddItemInterface } from '../features/dashboard/interfaces/add-item.interface';
import { ItemsSaleInterfaceApi } from '../features/dashboard/interfaces/items-sale-interface-api';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  public apiUrl = environment.urlBackEnd;
  constructor(private http: HttpClient) { }

  createSaleByClient(): Observable<any> {
    const url = `${this.apiUrl}/sale`
    return this.http.get(url)
  }

  addItemInTable(data: AddItemInterface): Observable<AddItemInterface> {
    console.log('data', data);
    const url = `${this.apiUrl}/sale/addItem`;
    return this.http.post<AddItemInterface>(url, data);
  }

  getAccountByTable(tableId: string): Observable<ItemsSaleInterfaceApi> {
    const url = `${this.apiUrl}/sale/account/${tableId}`;
    return this.http.get<ItemsSaleInterfaceApi>(url);
  }
}
