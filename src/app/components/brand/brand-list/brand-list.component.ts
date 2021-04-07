import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css'],
})
export class BrandListComponent implements OnInit {
  brands: Brand[] = [];
  pressedBrand = {
    deleteProgress: 0,
    brandId: 0,
  };
  tableRefreshing: boolean = false;
  filterText: string = '';
  constructor(
    private brandService: BrandService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.fillBrands();
  }

  fillBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.tableRefreshing = false;
    });
  }

  holdHandler(e: number, brand: Brand) {
    this.pressedBrand.brandId = brand.id;
    this.pressedBrand.deleteProgress = e / 5;

    if (e / 10 > 100) {
      this.deleteBrand(brand);
    }
  }

  deleteBrand(brand: Brand) {
    this.tableRefreshing = true;

    this.brandService.delete(brand).subscribe((response) => {
      if (response.success) {
        this.toastrService.success('Brand deleted');
      } else {
        this.toastrService.error(response.message);
      }
      this.fillBrands();
      this.pressedBrand = {
        deleteProgress: 0,
        brandId: 0,
      };
    });
  }
}
