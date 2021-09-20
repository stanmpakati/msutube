import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(value: number): string {
    if (value) {
      const hours = Math.floor(value / 3600);
      const minutes = Math.floor((value % 3600) / 60);
      const seconds = Math.round(value % 60);
      let result = `${minutes.toString().padStart(1, '0')}
    :${seconds.toString().padStart(2, '0')}`;
      if (!!hours) {
        result = `${hours.toString()}
      :${minutes.toString().padStart(2, '0')}
      :${seconds.toString().padStart(2, '0')}`;
      }
      return result;
    } else return '';
  }
}
