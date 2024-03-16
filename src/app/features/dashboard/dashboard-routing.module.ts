import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { CustomerServiceComponent } from './components/customer-service/customer-service.component';
import { SalesComponent } from './components/sales/sales.component';
import { SuppliersViewComponent } from './components/registrations/suppliers/view/suppliers-view.component';
import { PaymentMethodsViewComponent } from './components/registrations/payment-methods/view/payment-methods-view.component';
import { CustomersViewComponent } from './components/registrations/customers/view/customers-view.component';
import { DeliveryComponent } from './components/sales/components/delivery/delivery.component';
import { TableServiceComponent } from './components/sales/components/table-service/table-service.component';
import { ProductViewComponent } from './components/registrations/products/view/product-view.component';
import { CategoryViewComponent } from './components/registrations/categories/view/category-view.component';

const routes: Routes = [
	{
		path: '',
    	component: DashboardComponent,
		children: [
			{
				path: 'home',
				component: HomeComponent,
			},
			{
				path: 'customer-service',
				component: CustomerServiceComponent,
			},
			{
				path: 'sales',
				component: SalesComponent,
			},
			{
				path: 'suppliers',
				component: SuppliersViewComponent,
			},
			{
				path: 'customers',
				component: CustomersViewComponent,
			},
			{
				path: 'payment-methods',
				component: PaymentMethodsViewComponent,
			},
			{
				path: 'products',
				component: ProductViewComponent,
			},
			{
				path: 'categories',
				component: CategoryViewComponent,
			},
			{
				path: 'delivery',
				component: DeliveryComponent,
			},
			{
				path: 'table-service',
				component: TableServiceComponent,
			},
			{
				path: '**',
				redirectTo: 'home',
				pathMatch: 'full'
			},
		]
	},
	
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DashboardRoutingModule { }
