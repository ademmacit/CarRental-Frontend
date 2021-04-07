import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css'],
})
export class ColorAddComponent implements OnInit {
  colorAddForm: FormGroup;
  constructor(
    private toastrService: ToastrService,
    private colorService: ColorService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createColorAddForm();
  }
  createColorAddForm() {
    this.colorAddForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  add() {
    if (this.colorAddForm.valid) {
      let colorModel: Color = Object.assign({}, this.colorAddForm.value);
      this.colorService.add(colorModel).subscribe((response) => {
        if (response.success) {
          this.toastrService.success(colorModel.name + ' added');
        } else {
          this.toastrService.error(response.message);
        }
      });
    } else {
      this.toastrService.warning('color name is empty');
    }
  }
}
