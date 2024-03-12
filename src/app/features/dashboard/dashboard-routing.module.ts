import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { CustomerServiceComponent } from './components/customer-service/customer-service.component';
import { SalesComponent } from './components/sales/sales.component';
import { SuppliersViewComponent } from './components/registrations/suppliers/view/suppliers-view.component';
import { PaymentMethodsViewComponent } from './components/registrations/payment-methods/view/payment-methods-view.component';
import { CustomersViewComponent } from './components/registrations/customers/view/customers-view.component';

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
