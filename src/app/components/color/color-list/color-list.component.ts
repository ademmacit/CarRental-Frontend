import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css'],
})
export class ColorListComponent implements OnInit {
  colors: Color[] = [];
  filterText: string = '';
  constructor(
    private colorService: ColorService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.fillColors();
  }
  fillColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  deleteColor(color: Color) {
    this.colorService.delete(color).subscribe((response) => {
      if (response.success) {
        this.toastrService.success('Color deleted');
        this.fillColors();
      } else {
        this.toastrService.error(response.message);
      }
    });
  }
}
