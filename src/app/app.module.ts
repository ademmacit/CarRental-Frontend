import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { BrandSelectComponent } from './components/brand/brand-select/brand-select.component';
import { ColorSelectComponent } from './components/color/color-select/color-select.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CarDetailListComponent } from './components/car/car-detail-list/car-detail-list.component';
import { RentalDetailComponent } from './components/rental-detail/rental-detail.component';
import { CarFullDetailComponent } from './components/car/car-full-detail/car-full-detail.component';
import { BrandFilterPipePipe } from './pipes/brand-filter-pipe.pipe';
import { CarFilterPipePipe } from './pipes/car-filter-pipe.pipe';
import { ColorFilterPipePipe } from './pipes/color-filter-pipe.pipe';
import { FiltersComponent } from './components/filters/filters.component';
import { RentFormComponent } from './components/rent-form/rent-form.component';
import { PaymentComponent } from './components/payment/payment.component';
import { BrandAddComponent } from './components/brand/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color/color-add/color-add.component';
import { CarAddComponent } from './components/car/car-add/car-add.component';
import { BrandListComponent } from './components/brand/brand-list/brand-list.component';
import { BrandUpdateComponent } from './components/brand/brand-update/brand-update.component';
import { ColorListComponent } from './components/color/color-list/color-list.component';
import { ColorUpdateComponent } from './components/color/color-update/color-update.component';
import { CarListComponent } from './components/car/car-list/car-list.component';
import { CarUpdateComponent } from './components/car/car-update/car-update.component';
import { LoginFormComponent } from './components/user/login-form/login-form.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterFormComponent } from './components/user/register-form/register-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    BrandSelectComponent,
    ColorSelectComponent,
    CustomerComponent,
    CarDetailListComponent,
    RentalDetailComponent,
    CarFullDetailComponent,
    BrandFilterPipePipe,
    CarFilterPipePipe,
    ColorFilterPipePipe,
    FiltersComponent,
    RentFormComponent,
    PaymentComponent,
    BrandAddComponent,
    ColorAddComponent,
    CarAddComponent,
    BrandListComponent,
    BrandUpdateComponent,
    ColorListComponent,
    ColorUpdateComponent,
    CarListComponent,
    CarUpdateComponent,
    LoginFormComponent,
    RegisterFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 1500,
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
