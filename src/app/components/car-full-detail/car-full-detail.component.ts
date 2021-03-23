import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { carDetail } from 'src/app/models/carDetail';
import { carImage } from 'src/app/models/carImage';
import { CarFullDetailService } from 'src/app/services/car-full-detail.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-full-detail',
  templateUrl: './car-full-detail.component.html',
  styleUrls: ['./car-full-detail.component.css'],
})
export class CarFullDetailComponent implements OnInit {
  currentCarDetail: carDetail;
  currentCarImages: carImage[] = [];
  imageUrl: string = 'https://localhost:44330/';

  constructor(
    private carFullDetailService: CarFullDetailService,
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetail(params['carId']);
        this.getCarImages(params['carId']);
      }
    });
  }

  getCarDetail(carId: number) {
    this.carFullDetailService.getCarDetail(carId).subscribe((response) => {
      this.currentCarDetail = response.data;
    });
  }

  getCarImages(carId: number) {
    this.carFullDetailService.getCarImages(carId).subscribe((response) => {
      this.currentCarImages = response.data;
    });
  }
}
