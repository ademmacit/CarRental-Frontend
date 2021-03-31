import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm: FormGroup;
  currentCar: Car;
  brands: Brand[] = [];
  colors: Color[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private brandService: BrandService,
    private colorService: ColorService
  ) {}

  ngOnInit(): void {
    this.fillBrandsSelect();
    this.fillColorsSelect();
    this.createCarUpdateForm();
    this.catchRoute();
  }
  fillColorsSelect() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  fillBrandsSelect() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  catchRoute() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.fillCurrentCar(params['carId']);
      }
    });
  }
  fillCurrentCar(brandId: number) {
    this.carService.getCarById(brandId).subscribe((response) => {
      this.currentCar = response.data;
      this.patchBrandUpdateForm();
    });
  }

  patchBrandUpdateForm() {
    this.carUpdateForm.patchValue({
      brandId: this.currentCar.brandId,
      colorId: this.currentCar.colorId,
      modelYear: this.currentCar.modelYear,
      dailyPrice: this.currentCar.dailyPrice,
      description: this.currentCar.description,
    });
  }
  update() {
    if (this.carUpdateForm.valid) {
      let carModel: Car = Object.assign(
        this.currentCar,
        this.carUpdateForm.value
      );
      this.carService.update(carModel).subscribe((response) => {
        if (response.success) {
          this.toastrService.success('car updated');
        } else {
          this.toastrService.error(response.message);
        }
      });
    }
  }
}
