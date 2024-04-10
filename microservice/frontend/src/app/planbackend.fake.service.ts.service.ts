import { Injectable } from '@angular/core';
import { SesionDTO } from '../openapi/lifefitAPI';
import { Observable, of } from 'rxjs';


const sesionesC: SesionDTO [] = [
  {
    idPlan: 0,
    inicio: new Date("2003-08-20T08:00"),
    fin: new Date("2003-08-20T09:00"),
    trabajoRealizado: "mucho",
    multimedia: [],
    descripcion: "null",
    presencial: true,
    datosSalud: new Array<string>(),
    id: 0
  },
  {
    idPlan: 0,
    inicio: new Date("2024-08-20T08:00"),
    fin: new Date("2024-08-20T09:00"),
    trabajoRealizado: "nada",
    multimedia: [],
    descripcion: "null",
    presencial: false,
    datosSalud: new Array<string>(),
    id: 1
  },
  {
    idPlan: 1,
    inicio: new Date("2024-04-10T13:35"),
    fin: new Date("2024-04-11T23:59"),
    trabajoRealizado: "lo de angular",
    multimedia: [],
    descripcion: "demasiado trabajo :(",
    presencial: true,
    datosSalud: new Array<string>(),
    id: 1
  },
];

@Injectable({
  providedIn: 'root'
})
export class PlanbackendFakeServiceTsService {

  private sesiones: SesionDTO [];

  constructor() {
    let _sesiones = localStorage.getItem('sesiones');
    if (_sesiones) {
      this.sesiones = JSON.parse(_sesiones);
    } else {
      this.sesiones = [...sesionesC];
    }
  }

  private guardarSesionesEnLocalStorage() {
    localStorage.setItem('sesiones', JSON.stringify(this.sesiones));
  }

  getSesiones(): Observable<SesionDTO[]>{
    return of(this.sesiones);
  }

  //AÑADIR SESION
  postUsuario(sesion: SesionDTO): Observable<SesionDTO> {
    let u = this.sesiones.find(u => u.id == sesion.id);
    if (!sesion.id) {
      return new Observable<SesionDTO>(observer => {
        observer.error('El id es obligatorio');
      });
    }
    if (u) {
      return new Observable<SesionDTO>(observer => {
        observer.error('Ya existe una sesion con esa id');
      });
    }

    sesion.id = this.sesiones.map(u => u.id).reduce((a, b) => Math.max(a, b)) + 1;
    this.sesiones.push(sesion);
    this.guardarSesionesEnLocalStorage();
    return of(sesion);
  }

  //EDITAR SESION
  putSesion(sesion: SesionDTO): Observable<SesionDTO> {
    let u = this.sesiones.find(u => u.id == sesion.id);
    if (!u) {
      return new Observable<SesionDTO>(observer => {
        observer.error('La sesion no existe');
      });
    }

    Object.assign(u, sesion);
    this.guardarSesionesEnLocalStorage();
    return of(u);
  }

  deleteSesion(id: number): Observable<void> {
    let i = this.sesiones.findIndex(u => u.id == id);
    if (i < 0) {
      return new Observable<void>(observer => {
        observer.error('La sesion no existe');
      });
    }
    this.sesiones.splice(i, 1);
    this.guardarSesionesEnLocalStorage();
    return of();
  }
}
