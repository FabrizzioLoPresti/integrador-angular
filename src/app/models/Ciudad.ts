import { Provincia } from "./Provincia";

export interface Ciudad {
  id: string,
  nombre: string,
  idprovincia: string,
  provincia?: Provincia
}