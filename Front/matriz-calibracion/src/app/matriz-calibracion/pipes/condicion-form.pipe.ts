import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'siCumpleCondicion'
})

export class siCumpleCondicion implements PipeTransform {
  transform(value: number): string{
    if ( value!= null) {
      if (value === 0) {
        return "No cumple"
      }
      else if (value === 1) {
        return "Cumple"
      }
      else
      {
        console.log('Error en el pipe ')
      }
    }
    return "";
  }
}
