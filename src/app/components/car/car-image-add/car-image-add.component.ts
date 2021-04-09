import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { requiredFileType } from './car-image-validators';

@Component({
  selector: 'app-car-image-add',
  templateUrl: './car-image-add.component.html',
  styleUrls: ['./car-image-add.component.css'],
})
export class CarImageAddComponent implements OnInit {
  imageUploadForm: FormGroup;
  cars: Car[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private carImageService: CarImageService,
    private carService: CarService,
    private toastrService: ToastrService
  ) {}

  signup = new FormGroup({
    image: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.fillCars();
    this.createForm();
  }

  createForm() {
    this.imageUploadForm = this.formBuilder.group({
      carId: [null, Validators.required],
      image: [null, [Validators.required, requiredFileType('png')]],
    });
  }

  add() {
    if (this.imageUploadForm.valid) {
      console.log(this.imageUploadForm.value);
      this.carImageService.add(this.imageUploadForm).subscribe((response) => {
        if (response.success) {
          this.toastrService.success('image added succesfully');
        } else {
          this.toastrService.error(response.message);
        }
      });
    }
  }

  fillCars() {
    this.carService.getCars().subscribe((response) => {
      if (response.success) {
        this.cars = response.data;
      } else {
        this.toastrService.error(response.message);
      }
    });
  }
}
