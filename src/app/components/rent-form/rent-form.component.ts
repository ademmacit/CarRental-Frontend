import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { carDetail } from 'src/app/models/carDetail';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CustomerService } from 'src/app/services/customer.service';
import { FindeksMockService } from 'src/app/services/findeks-mock.service';

@Component({
  selector: 'app-rent-form',
  templateUrl: './rent-form.component.html',
  styleUrls: ['./rent-form.component.css'],
})
export class RentFormComponent implements OnInit {
  startDate: Date;
  endDate: Date;
  customers: Customer[];
  selectedCustomer: Customer;
  constructor(
    private customerService: CustomerService,
    private findeksMockService: FindeksMockService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  @Input() carDetailToBeRent: carDetail;

  ngOnInit(): void {
    this.getCustomers();
  }

  getTodayDate() {
    var today = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString().slice(0, 10);
  }
  getCustomers() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
    });
  }

  onSelectedCustomerChange() {}

  rentCar() {
    let rental: Rental = {
      carId: this.carDetailToBeRent.carId,
      customerId: this.selectedCustomer.id,
      rentDate: this.startDate,
      returnDate: this.endDate,
    };
    //findeks control here
    this.findeksMockService
      .getFindeksByCustomerId(rental.customerId)
      .subscribe((response) => {
        if (this.carDetailToBeRent.findeks > response.data.findeks) {
          this.toastr.error(
            'The car you are looking for has higher findeks than customer'
          );
        } else {
          this.toastr.info('Navigating to the payment page');
          this.router.navigate(['/payment/' + JSON.stringify(rental)]);
        }
      });
  }
}
