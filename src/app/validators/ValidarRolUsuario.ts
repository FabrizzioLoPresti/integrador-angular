import { AbstractControl } from "@angular/forms";

export function ValidarRolUusuario(control: AbstractControl) {
  if(control.value.includes("3")) {
    return {
      usuarioInvalido: true
    }
  }
  return null
}