import { Rol } from './Rol'
import { Provincia } from './Provincia'
import { Ciudad } from './Ciudad'

export interface Persona {
  id: string,
  nombre: string,
  edad: number,
  direccion: {
    idProvincia: string,
    provincia?: Provincia,
    idCiudad: string,
    ciudad?: Ciudad,
    calle: string,
    nro: number
  },
  rol?: Rol,
  idRol: string
}