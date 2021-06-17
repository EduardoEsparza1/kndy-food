import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pesos'
})
export class PesosPipe implements PipeTransform {

  transform(value: number): string {
    return "$" + value.toString();
  }

}
