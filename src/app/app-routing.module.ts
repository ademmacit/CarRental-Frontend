import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand/brand-add/brand-add.component';
import { BrandListComponent } from './components/brand/brand-list/brand-list.component';
import { BrandUpdateComponent } from './components/brand/brand-update/brand-update.component';
import { CarAddComponent } from './components/car/car-add/car-add.component';
import { CarDetailListComponent } from './components/car/car-detail-list/car-detail-list.component';
import { CarFullDetailComponent } from './components/car/car-full-detail/car-full-detail.component';
import { CarListComponent } from './components/car/car-list/car-list.component';
import { CarUpdateComponent } from './components/car/car-update/car-update.component';
import { ColorAddComponent } from './components/color/color-add/color-add.component';
import { ColorListComponent } from './components/color/color-list/color-list.component';
import { ColorUpdateComponent } from './components/color/color-update/color-update.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarDetailListComponent },
  { path: 'cars/brand/:brandId', component: CarDetailListComponent },
  { path: 'cars/color/:colorId', component: CarDetailListComponent },
  {
    path: 'cars/color/:colorId/brand/:brandId',
    component: CarDetailListComponent,
  },
  { path: 'cars', component: CarDetailListComponent },
  { path: 'cars/detail/:carId', component: CarFullDetailComponent },
  { path: 'cars/add', component: CarAddComponent },
  { path: 'cars/list', component: CarListComponent },
  { path: 'cars/update/:carId', component: CarUpdateComponent },

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
