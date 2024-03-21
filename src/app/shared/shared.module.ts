import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from './chart/bar-chart/bar-chart.component';
import { LineChartComponent } from './chart/line-chart/line-chart.component';
import { DoughnutChartComponent } from './chart/doughnut-chart/doughnut-chart.component';
import { ConfirmationDialogComponent } from './modal/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '../material-module';
import { CustomDialogComponent } from '../features/dashboard/components/sales/components/table-service/sales/custom-dialog.component';
import { SaleService } from '../core/sale.service';

@NgModule({
  declarations: [
    BarChartComponent,
    LineChartComponent,
    DoughnutChartComponent,
    ConfirmationDialogComponent,
    CustomDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MaterialModule
  ],
  exports: [
    LineChartComponent,
    DoughnutChartComponent,
    BarChartComponent,
    ConfirmationDialogComponent,
    CustomDialogComponent
  ],
  providers: [
    SaleService
  ]
})
export class SharedModule { }
