import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SalesTrendsComponent } from './components/sales-trends/sales-trends.component';
import { SalesDistributionComponent } from './components/sales-distribution/sales-distribution.component';

const routes: Routes = [
  {path: "", component: DashboardComponent},
  {path: "trends", component: SalesTrendsComponent},
  {path: "distribution", component: SalesDistributionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
