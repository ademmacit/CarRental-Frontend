import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { carDetail } from 'src/app/models/carDetail';
import { CarDetailService } from 'src/app/services/car-detail.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  carDetails: carDetail[] = [];
  constructor(
    private carDetailService: CarDetailService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarDetailsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarDetailsByColor(params['colorId']);
      } else {
        this.getCarDetails();
      }
    });
  }

  getCarDetails() {
    this.carDetailService.getCarDetails().subscribe((response) => {
      this.carDetails = response.data;
    });
  }
  getCarDetailsByBrand(brandId: number) {
    this.carDetailService
      .getCarDetailsByBrand(brandId)
      .subscribe((response) => {
        this.carDetails = response.data;
      });
  }

  getCarDetailsByColor(colorId: number) {
    this.carDetailService
      .getCarDetailsByColor(colorId)
      .subscribe((response) => {
        this.carDetails = response.data;
      });
  }
}
