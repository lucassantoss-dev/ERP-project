import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { PatientComponent } from './components/patient/patient.component';
import { DataUploadComponent } from './components/data-upload/data-upload.component';

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
				path: 'patient',
				component: PatientComponent,
			},
			{
				path: 'user-upload',
				component: DataUploadComponent,
			},
			{
				path: '**',
				redirectTo: 'patient',
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
