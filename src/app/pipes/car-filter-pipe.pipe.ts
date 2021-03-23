import { Pipe, PipeTransform } from '@angular/core';
import { carDetail } from '../models/carDetail';

@Pipe({
  name: 'carFilterPipe',
})
export class CarFilterPipePipe implements PipeTransform {
  transform(value: carDetail[], filterText: string): carDetail[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';

    return filterText
      ? value.filter(
          (p: carDetail) =>
            p.carName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
