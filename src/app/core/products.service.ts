import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsInterfaceApi } from '../features/dashboard/interfaces/products-interface-api';
import { environment } from '../enviroments/enviroment';
import { ProductsInterface } from '../features/dashboard/interfaces/products-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public urlApi = environment.urlBackEnd;
  constructor(private http: HttpClient) { }
  
  getAllProducts(): Observable<ProductsInterfaceApi> {
    const url = `${this.urlApi}/product`;
    return this.http.get<ProductsInterfaceApi>(url);
  }

  getProductById(id: string): Observable<ProductsInterface> {
    const url = `${this.urlApi}/product/${id}`;
    return this.http.get<ProductsInterface>(url);
  }

  createProduct(data: ProductsInterface): Observable<ProductsInterface> {
    const url = `${this.urlApi}/product/create`;
    return this.http.post<ProductsInterface>(url, data);
  }

  updateProduct(id: string, data: ProductsInterface): Observable<ProductsInterface> {
    const url = `${this.urlApi}/product/${id}`;
    return this.http.put<ProductsInterface>(url, data);
  }

  deleteProduct(id: string): Observable<ProductsInterface> {
    const url = `${this.urlApi}/product/${id}`
    return this.http.delete<ProductsInterface>(url);
  }
}
