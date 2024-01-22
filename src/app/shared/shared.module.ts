import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from './chart/bar-chart/bar-chart.component';
import { LineChartComponent } from './chart/line-chart/line-chart.component';
import { DoughnutChartComponent } from './chart/doughnut-chart/doughnut-chart.component';



@NgModule({
  declarations: [
    BarChartComponent,
    LineChartComponent,
    DoughnutChartComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LineChartComponent,
    DoughnutChartComponent,
    BarChartComponent
  ]
})
export class SharedModule { }
