import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fistName'
})
export class FistNamePipe implements PipeTransform {

  transform(displayName: string): string {
    return displayName.indexOf(' ') > -1 ?
      displayName.substr(0, displayName.indexOf(' '))
      : displayName;
  }

}
