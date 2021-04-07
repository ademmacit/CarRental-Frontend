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
  tableRefreshing: boolean = false;
  pressedColor = {
    deleteProgress: 0,
    colorId: 0,
  };
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
      this.tableRefreshing = false;
    });
  }

  holdHandler(e: number, color: Color) {
    this.pressedColor.colorId = color.id;
    this.pressedColor.deleteProgress = e / 5;

    if (e / 10 > 100) {
      this.deleteColor(color);
    }
  }

  deleteColor(color: Color) {
    this.tableRefreshing = true;

    this.colorService.delete(color).subscribe((response) => {
      if (response.success) {
        this.toastrService.success('Color deleted');
      } else {
        this.toastrService.error(response.message);
      }
      this.fillColors();
      this.pressedColor = {
        deleteProgress: 0,
        colorId: 0,
      };
    });
  }
}
