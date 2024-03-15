import { Injectable } from '@angular/core';
import * as supplierMock from '../shared/mocks/supplier.json';
import { SupplierApiInterface } from '../features/dashboard/interfaces/supplier-interface-api';
import { Observable, of } from 'rxjs';
import { environment } from '../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { SupplierInterface } from '../features/dashboard/interfaces/supplier-interface';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  public apiUrl = environment.urlBackEnd;
  constructor(private http: HttpClient) { }

  getSupplier(): Observable<SupplierApiInterface> {
    const url = `${this.apiUrl}/provider`;
    return this.http.get<SupplierApiInterface>(url);
  }

  getProviderById(id: string): Observable<SupplierInterface> {
    const url = `${this.apiUrl}/provider/${id}`
    return this.http.get<SupplierInterface>(url);
  }

  createProvider(data: SupplierInterface): Observable<SupplierInterface> {
    console.log('data?', data);
    const url = `${this.apiUrl}/provider/create`;
    return this.http.post<SupplierInterface>(url, data);
  }

  updateProvider(id: string, data: SupplierInterface): Observable<SupplierInterface> {
    const url = `${this.apiUrl}/provider/${id}`;
    return this.http.put<SupplierInterface>(url, data);
  }

  deleteProvider(id: string): Observable<SupplierInterface> {
    const url = `${this.apiUrl}/provider/${id}`;
    return this.http.delete<SupplierInterface>(url);
  }
}
