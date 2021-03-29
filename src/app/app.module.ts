import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { BrandSelectComponent } from './components/brand-select/brand-select.component';
import { ColorSelectComponent } from './components/color-select/color-select.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { RentalDetailComponent } from './components/rental-detail/rental-detail.component';
import { CarComponent } from './components/car/car.component';
import { CarFullDetailComponent } from './components/car-full-detail/car-full-detail.component';
import { BrandFilterPipePipe } from './pipes/brand-filter-pipe.pipe';
import { CarFilterPipePipe } from './pipes/car-filter-pipe.pipe';
import { ColorFilterPipePipe } from './pipes/color-filter-pipe.pipe';
import { FiltersComponent } from './components/filters/filters.component';
import { RentFormComponent } from './components/rent-form/rent-form.component';
import { PaymentComponent } from './components/payment/payment.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    BrandSelectComponent,
    ColorSelectComponent,
    CustomerComponent,
    CarDetailComponent,
    RentalDetailComponent,
    CarComponent,
    CarFullDetailComponent,
    BrandFilterPipePipe,
    CarFilterPipePipe,
    ColorFilterPipePipe,
    FiltersComponent,
    RentFormComponent,
    PaymentComponent,
    BrandAddComponent,
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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
