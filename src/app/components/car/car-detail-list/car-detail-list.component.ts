import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { carDetail } from 'src/app/models/carDetail';
import { CarDetailService } from 'src/app/services/car-detail.service';

@Component({
  selector: 'app-car-detail-list',
  templateUrl: './car-detail-list.component.html',
  styleUrls: ['./car-detail-list.component.css'],
})
export class CarDetailListComponent implements OnInit {
  carDetails: carDetail[] = [];
  filterText: string = '';
  constructor(
    private carDetailService: CarDetailService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.decideFilterAndGetCarDetails();
  }

  //TODO MAKE THIS BATTER
  decideFilterAndGetCarDetails() {
    this.activatedRoute.params.subscribe((params) => {
      if (!(params['brandId'] && params['colorId'])) {
        this.getCarDetails();
        return;
      }

      if (params['brandId'] === '0' && params['colorId'] === '0') {
        this.getCarDetails();
      } else if (params['brandId'] === '0') {
        this.getCarDetailsByColor(params['colorId']);
      } else if (params['colorId'] === '0') {
        this.getCarDetailsByBrand(params['brandId']);
      } else {
        this.getCarDetailsByColorAndBrand(params['colorId'], params['brandId']);
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

  getCarDetailsByColorAndBrand(colorId: number, brandId: number) {
    this.carDetailService
      .getCarDetailsByColorAndBrand(colorId, brandId)
      .subscribe((response) => {
        this.carDetails = response.data;
      });
  }
}
