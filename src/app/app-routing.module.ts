import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand/brand-add/brand-add.component';
import { BrandListComponent } from './components/brand/brand-list/brand-list.component';
import { BrandUpdateComponent } from './components/brand/brand-update/brand-update.component';
import { CarAddComponent } from './components/car/car-add/car-add.component';
import { CarDetailComponent } from './components/car/car-detail/car-detail.component';
import { CarFullDetailComponent } from './components/car/car-full-detail/car-full-detail.component';
import { ColorAddComponent } from './components/color/color-add/color-add.component';
import { ColorListComponent } from './components/color/color-list/color-list.component';
import { ColorUpdateComponent } from './components/color/color-update/color-update.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarDetailComponent },
  { path: 'cars/brand/:brandId', component: CarDetailComponent },
  { path: 'cars/color/:colorId', component: CarDetailComponent },
  { path: 'cars/color/:colorId/brand/:brandId', component: CarDetailComponent },
  { path: 'cars', component: CarDetailComponent },
  { path: 'cars/detail/:carId', component: CarFullDetailComponent },
  { path: 'cars/add', component: CarAddComponent },
  { path: 'payment/:rental', component: PaymentComponent },
  { path: 'brands/add', component: BrandAddComponent },
  { path: 'brands/list', component: BrandListComponent },
  { path: 'brands/update/:brandId', component: BrandUpdateComponent },
  { path: 'colors/add', component: ColorAddComponent },
  { path: 'colors/list', component: ColorListComponent },
  { path: 'colors/update/:colorId', component: ColorUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
