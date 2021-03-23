import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  rental: Rental;
  constructor(
    private rentalService: RentalService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['rental']) {
        this.rental = JSON.parse(params['rental']);
      }
    });
  }

  addRental() {
    this.rentalService.addRental(this.rental).subscribe((response) => {
      if (response.success) {
        this.toastr.success('Car succesfully rented');
      } else {
        this.toastr.error(response.message);
      }
      this.router.navigate(['cars']);
    });
  }
}
