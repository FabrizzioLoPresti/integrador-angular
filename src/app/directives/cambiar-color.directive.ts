import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCambiarColor]'
})
export class CambiarColorDirective {

  constructor(private elementRef:ElementRef) { }

  private readonly colores = [
    'red',
    'green',
    'pink',
    'blue'
  ]

  @HostListener('click')
  onClick() {
    const colorIndex = Math.round( Math.random() * (this.colores.length - 1) )
    this.elementRef.nativeElement.style.color = this.colores[colorIndex]
  }

}
