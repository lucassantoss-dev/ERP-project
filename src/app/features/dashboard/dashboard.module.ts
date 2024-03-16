import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { HomeComponent } from './components/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material-module';
import { SalesComponent } from './components/sales/sales.component';
import { CustomerServiceComponent } from './components/customer-service/customer-service.component';
import { SuppliersFormComponent } from './components/registrations/suppliers/form/suppliers-form.component';
import { SuppliersViewComponent } from './components/registrations/suppliers/view/suppliers-view.component';
import { CustomersViewComponent } from './components/registrations/customers/view/customers-view.component';
import { CustomersFormComponent } from './components/registrations/customers/form/customers-form/customers-form.component';
import { OrderListComponent } from './components/sales/components/delivery/order-list/order-list.component';
import { OrderDetailsComponent } from './components/sales/components/delivery/order-details/order-details.component';
import { DeliveryComponent } from './components/sales/components/delivery/delivery.component';
import { TableServiceComponent } from './components/sales/components/table-service/table-service.component';
import { TableService } from 'src/app/core/table.service';
import { SupplierService } from 'src/app/core/supplier.service';
import { ProductViewComponent } from './components/registrations/products/view/product-view.component';
import { ProductFormComponent } from './components/registrations/products/form/product-form.component';
import { ProductsService } from 'src/app/core/products.service';
import { CategoryViewComponent } from './components/registrations/categories/view/category-view.component';
import { CategoryFormComponent } from './components/registrations/categories/form/category-form.component';
import { CategoryService } from 'src/app/core/category.service';

@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    SalesComponent,
    CustomerServiceComponent,
    SuppliersFormComponent,
    SuppliersViewComponent,
    CustomersViewComponent,
    CustomersFormComponent,
    OrderListComponent,
    OrderDetailsComponent,
    DeliveryComponent,
    TableServiceComponent,
    ProductViewComponent,
    ProductFormComponent,
    CategoryViewComponent,
    CategoryFormComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCardModule,
    SharedModule,
    MaterialModule,
  ],
  providers: [
    TableService,
    SupplierService,
    ProductsService,
    CategoryService
  ]
})
export class DashboardModule { }
