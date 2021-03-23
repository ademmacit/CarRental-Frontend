import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  selectedBrand: Brand;
  allBrandsOption: Brand = { id: 0, name: 'all' };
  filterText: string = '';

  brands: Brand[] = [];
  constructor(private brandService: BrandService) {}

  @Output() selectedBrandEmitter = new EventEmitter<Brand>();

  ngOnInit(): void {
    this.getBrands();
    this.selectedBrand = this.allBrandsOption;
    this.selectedBrandEmitter.emit(this.selectedBrand);
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  onSelectedBrandChange() {
    this.selectedBrandEmitter.emit(this.selectedBrand);
  }
}
