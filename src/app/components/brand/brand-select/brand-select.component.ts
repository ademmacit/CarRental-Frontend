import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-select',
  templateUrl: './brand-select.component.html',
  styleUrls: ['./brand-select.component.css'],
})
export class BrandSelectComponent implements OnInit {
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
