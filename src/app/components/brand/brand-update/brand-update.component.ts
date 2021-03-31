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
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css'],
})
export class BrandUpdateComponent implements OnInit {
  brandUpdateForm: FormGroup;
  currentBrand: Brand;

  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createBrandUpdateForm();
    this.catchRoute();
  }

  createBrandUpdateForm() {
    this.brandUpdateForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  catchRoute() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.fillCurrentBrand(params['brandId']);
      }
    });
  }

  fillCurrentBrand(brandId: number) {
    this.brandService.getBrandById(brandId).subscribe((response) => {
      this.currentBrand = response.data;
      this.patchBrandUpdateForm();
    });
  }

  patchBrandUpdateForm() {
    this.brandUpdateForm.patchValue({
      name: this.currentBrand.name,
    });
  }

  update() {
    if (this.brandUpdateForm.valid) {
      let brandModel: Brand = Object.assign(
        this.currentBrand,
        this.brandUpdateForm.value
      );
      this.brandService.update(brandModel).subscribe((response) => {
        if (response.success) {
          this.toastrService.success('brand updated');
        } else {
          this.toastrService.error(response.message);
        }
      });
    }
  }
}
