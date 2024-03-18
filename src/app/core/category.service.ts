import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryInterfaceApi } from '../features/dashboard/interfaces/category-interface-api';
import { environment } from '../enviroments/enviroment';
import { CategoryInterface } from '../features/dashboard/interfaces/category-interface';

@Injectable({
	providedIn: 'root'
})
export class CategoryService {
	public urlApi = environment.urlBackEnd;
	constructor(private http: HttpClient) { }

	getAllCategories(): Observable<CategoryInterfaceApi> {
		const url = `${this.urlApi}/category`;
		return this.http.get<CategoryInterfaceApi>(url);
	};

	getCategoryById(id: string): Observable<CategoryInterface> {
		const url = `${this.urlApi}/category/${id}`;
		return this.http.get<CategoryInterface>(url);
	}

	createCategory(data: CategoryInterface): Observable<CategoryInterface> {
		const url = `${this.urlApi}/category/create`;
		return this.http.post<CategoryInterface>(url, data);
	}

	updateCategory(id: string, data: CategoryInterface): Observable<CategoryInterface> {
		const url = `${this.urlApi}/category/${id}`;
		return this.http.put<CategoryInterface>(url, data);
	}

	deleteCategory(id: string): Observable<CategoryInterface> {
		const url = `${this.urlApi}/category/${id}`;
		return this.http.delete<CategoryInterface>(url);
	}
}
