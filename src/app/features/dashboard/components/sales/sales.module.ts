import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReservationComponent } from './components/table-service/reservation/reservation.component';


@NgModule({
  declarations: [
  
    ReservationComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    HttpClientModule
  ]
})
export class SalesModule { }
