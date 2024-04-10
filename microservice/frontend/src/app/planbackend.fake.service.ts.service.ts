import { Injectable } from '@angular/core';
import { PlanDTO, SesionDTO, SesionNuevaDTO } from '../openapi/lifefitAPI';
import { Observable, of } from 'rxjs';


const sesionesC: SesionDTO [] = [
  {
    idPlan: 0,
    inicio: new Date("2003-08-20T08:00"),
    fin: new Date("2003-08-20T09:00"),
    trabajoRealizado: "mucho",
    multimedia: ['https://youtu.be/AhvkKR0ero8?t=50', 'https://cdn.pixabay.com/photo/2023/06/15/15/01/ai-image-8065787_1280.jpg'],
    descripcion: "Hacía mucha calor, no se puede entrenar a estas horas",
    presencial: true,
    datosSalud: new Array<string>('90', '100', '12'),
    id: 0
  },
  {
    idPlan: 0,
    inicio: new Date("2024-08-20T08:00"),
    fin: new Date("2024-08-20T09:00"),
    trabajoRealizado: "nada",
    multimedia: ['https://youtu.be/2ZxdOeXUiJ0', 'https://cdn0.ecologiaverde.com/es/posts/7/4/9/reproduccion_del_cangrejo_cocotero_3947_3_600.jpg'],
    descripcion: "Y, viéndole don Quijote de aquella manera, con muestras de tanta tristeza, le dijo: Sábete, Sancho, que no es un hombre más que otro si no hace más que otro. Todas estas borrascas que nos suceden son.",
    presencial: false,
    datosSalud: new Array<string>(),
    id: 1
  },
  {
    idPlan: 1,
    inicio: new Date("2024-04-10T13:35"),
    fin: new Date("2024-04-11T23:59"),
    trabajoRealizado: "lo de angular",
    multimedia: ['https://youtube.com', 'nada'],
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

  getListaSesiones(): SesionDTO[]{
    return this.sesiones;
  }

  //AÑADIR SESION
  postSesion(sesion: SesionDTO): Observable<SesionDTO> {
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

  convertirSesion(sesionNueva: SesionNuevaDTO): SesionDTO{
    let sesion: SesionDTO = {
      idPlan: sesionNueva.idPlan,
      inicio: sesionNueva.inicio,
      fin: sesionNueva.fin,
      trabajoRealizado: sesionNueva.trabajoRealizado,
      multimedia: sesionNueva.multimedia,
      descripcion: sesionNueva.descripcion,
      presencial: sesionNueva.presencial,
      datosSalud: sesionNueva.datosSalud,
      id: 0
    }
    return sesion;
  }

  sortByIDPlan(s0: SesionDTO, s1: SesionDTO){
    //return (s0?.idPlan < s1?.idPlan) ? -1 : (s1?.idPlan > s0?.idPlan) ? 1 : 0; Da errores de undefined, no se me ocurre cómo quitarlo
  }
}
