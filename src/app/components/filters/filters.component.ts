import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit {
  constructor() {}
  selectedBrand: Brand;
  selectedColor: Color;

  ngOnInit(): void {}

  receiveBrand($event: any) {
    this.selectedBrand = $event;
  }
  receiveColor($event: any) {
    this.selectedColor = $event;
  }
}
