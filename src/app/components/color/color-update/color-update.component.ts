import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css'],
})
export class ColorUpdateComponent implements OnInit {
  colorUpdateForm: FormGroup;
  currentColor: Color;
  constructor(
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createColorUpdateForm();
    this.catchRoute();
  }
  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  catchRoute() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['colorId']) {
        this.fillCurrentColor(params['colorId']);
      }
    });
  }

  fillCurrentColor(colorId: number) {
    this.colorService.getColorById(colorId).subscribe((response) => {
      this.currentColor = response.data;
      this.patchColorUpdateForm();
    });
  }
  patchColorUpdateForm() {
    this.colorUpdateForm.patchValue({
      name: this.currentColor.name,
    });
  }

  update() {
    if (this.colorUpdateForm.valid) {
      let colorModel: Color = Object.assign(
        this.currentColor,
        this.colorUpdateForm.value
      );
      this.colorService.update(colorModel).subscribe((response) => {
        if (response.success) {
          this.toastrService.success('color updated');
        } else {
          this.toastrService.error(response.message);
        }
      });
    }
  }
}
