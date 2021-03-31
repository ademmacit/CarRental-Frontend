import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-select',
  templateUrl: './color-select.component.html',
  styleUrls: ['./color-select.component.css'],
})
export class ColorSelectComponent implements OnInit {
  selectedColor: Color;
  colors: Color[] = [];
  allColorsOption: Color = { id: 0, name: 'all' };
  filterText: string = '';

  constructor(private colorService: ColorService) {}

  @Output() selectedColorEmitter = new EventEmitter<Color>();

  ngOnInit(): void {
    this.getColors();
    this.selectedColor = this.allColorsOption;
    this.selectedColorEmitter.emit(this.selectedColor);
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  onSelectedColorChange() {
    this.selectedColorEmitter.emit(this.selectedColor);
  }
}
