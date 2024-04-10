import { Injectable } from '@angular/core';
import { SesionDTO, SesionNuevaDTO } from '../openapi/lifefitAPI';

@Injectable({
  providedIn: 'root'
})
export class SesionesServiceService {
  private sesiones: SesionDTO [] = [
    {id: 0},
  ];

  constructor() { }

  getSesiones(): SesionDTO[]{
    return this.sesiones;
  }

  agregarSesion(sesionNueva: SesionNuevaDTO): void{
    let sesion: SesionDTO = {
      idPlan: sesionNueva.idPlan,
      inicio: sesionNueva.inicio,
      fin: sesionNueva.fin,
      trabajoRealizado: sesionNueva.trabajoRealizado,
      multimedia: sesionNueva.multimedia,
      descripcion: sesionNueva.descripcion,
      presencial: sesionNueva.presencial,
      datosSalud: sesionNueva.datosSalud,
      id: Math.max(...this.sesiones.map(s => s.id))+1,
    }
    this.sesiones.push(sesion);
  }

  editarSesion(sesion: SesionDTO): void{
    let i = this.sesiones.findIndex(s => s.id == sesion.id);
    this.sesiones[i] = sesion;
  }

  eliminarSesion(id: number): void{
    let i = this.sesiones.findIndex(s => s.id == id);
    this.sesiones.splice(i,1);
  }
  
}
