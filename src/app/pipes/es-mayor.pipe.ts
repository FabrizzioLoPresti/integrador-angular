import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'esMayor'
})
export class EsMayorPipe implements PipeTransform {

  transform(value: number, compare: number = 18): string {
    const resultado = value >= compare ? 'Es mayor de edad' : 'Es menor de edad'
    return resultado;
  }

}
