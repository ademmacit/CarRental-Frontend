import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { CreditCard } from 'src/app/models/creditCard';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  rental: Rental;
  paymentInfoForm: FormGroup;
  constructor(
    private rentalService: RentalService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private creditCardService: CreditCardService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['rental']) {
        this.rental = JSON.parse(params['rental']);
      }
    });
    this.createPaymentInfoForm();
    this.patchPaymentInfo();
  }

  createPaymentInfoForm() {
    this.paymentInfoForm = this.formBuilder.group({
      cardNumber: ['', Validators.required],
      nameOnCard: ['', Validators.required],
      lastUseMonth: ['', Validators.required],
      lastUseYear: ['', Validators.required],
      cvv: ['', Validators.required],
    });
  }

  savePaymentInfo() {
    let userId: number | null = Number(this.localStorageService.Get('userId'));
    if (userId != null) {
      let creditCardModel: CreditCard = Object.assign(
        {},
        this.paymentInfoForm.value
      );
      creditCardModel.userId = userId;
      this.creditCardService.add(creditCardModel).subscribe((response) => {
        if (response.success) {
          this.toastr.success('credit card information has been saved');
        } else {
          this.toastr.error(response.message);
        }
      });
    }
    this.addRental();
  }

  patchPaymentInfo() {
    let userId: number | null = Number(this.localStorageService.Get('userId'));
    if (userId != null) {
      this.creditCardService.getByUserId(userId).subscribe((response) => {
        if (response.data != null) {
          console.log(response.data);
          this.toastr.info('loading credit card info');
          this.paymentInfoForm.patchValue({
            cardNumber: response.data.cardNumber,
            cvv: response.data.cvv,
            lastUseMonth: response.data.lastUseMonth,
            lastUseYear: response.data.lastUseYear,
            nameOnCard: response.data.nameOnCard,
          });
        }
      });
    }
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
