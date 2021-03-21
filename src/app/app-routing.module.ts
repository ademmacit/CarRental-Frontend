import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarFullDetailComponent } from './components/car-full-detail/car-full-detail.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarDetailComponent },
  { path: 'cars/brand/:brandId', component: CarDetailComponent },
  { path: 'cars/color/:colorId', component: CarDetailComponent },
  { path: 'cars', component: CarDetailComponent },
  { path: 'cars/detail/:carId', component: CarFullDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
