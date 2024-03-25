import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReservationComponent } from './components/table-service/reservation/reservation.component';
import { TableFormComponent } from './components/table-service/table-form/table-form.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    HttpClientModule
  ]
})
export class SalesModule { }
