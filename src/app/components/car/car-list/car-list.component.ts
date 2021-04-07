import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];
  tableRefreshing: boolean = false;
  pressedCar = {
    deleteProgress: 0,
    carId: 0,
  };
  constructor(
    private carService: CarService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.fillCars();
  }
  fillCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.tableRefreshing = false;
    });
  }

  holdHandler(e: number, car: Car) {
    this.pressedCar.carId = car.id;
    this.pressedCar.deleteProgress = e / 5;

    if (e / 10 > 100) {
      this.deleteCar(car);
    }
  }

  deleteCar(car: Car) {
    this.tableRefreshing = true;

    this.carService.delete(car).subscribe((response) => {
      if (response.success) {
        this.toastrService.success('Color deleted');
      } else {
        this.toastrService.error(response.message);
      }
      this.fillCars();
      this.pressedCar = {
        deleteProgress: 0,
        carId: 0,
      };
    });
  }
}
