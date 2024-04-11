import { Injectable } from '@angular/core';
import { PlanDTO, SesionDTO, SesionNuevaDTO } from '../openapi/lifefitAPI';
import { Observable, of } from 'rxjs';

/**
 *  ESTA ES NUESTRA IMPLEMENTACIÓN DE UN BACKEND FALSO PARA LAS SESIONES
 *  PARA HACER PETICIONES AL BACKEND REAL TENEMOS TODO ESE CÓDIGO EN openapi\lifefitAPI\
 *  QUE CONTIENE UNA IMPLEMENTACIÓN DE LAS ESPECIFICACIONES DE LOS ENDPOINTS SIGUIENDO 
 *  EL ENLACE A SWAGGERUI QUE SE NOS HA PROPORCIONADO EN EL CAMPUS VIRTUAL
 * 
 */

const sesionesC: SesionDTO [] = [
  {
    idPlan: 0,
    inicio: new Date("2003-08-20T08:00"),
    fin: new Date("2003-08-20T09:00"),
    trabajoRealizado: "Día de apuntarse",
    multimedia: ['https://www.youtube.com/results?search_query=videos+entrenamiento', 'https://cdn-prod.travelfuse.ro/images/_top_bd1057775084f11068659187b0b17e5b.jpg'],
    descripcion: "Sumérgete en una sesión de ejercicios revitalizante que despierta cada fibra de tu ser. Con rutinas dinámicas y motivación constante, esta sesión te lleva más allá de tus límites, cultivando fuerza física y mental.",
    presencial: true,
    datosSalud: new Array<string>('90', '1200', '91'),
    id: 0
  },
  {
    idPlan: 0,
    inicio: new Date("2024-08-20T08:00"),
    fin: new Date("2024-08-20T09:00"),
    trabajoRealizado: "Día de espalda y brazos",
    multimedia: ['https://www.youtube.com/results?search_query=videos+entrenamiento', 'https://www.entrenamientos.com/media/cache/exercise_375/uploads/exercise/curl-de-biceps-con-barra-recta-de-pie-agarre-supino-init-pos-3679.png'],
    descripcion: "30 kg en curl de bíceps",
    presencial: false,
    datosSalud: new Array<string>('80', '987', '120'),
    id: 1
  },
  {
    idPlan: 1,
    inicio: new Date("2024-04-10T13:35"),
    fin: new Date("2024-04-11T23:59"),
    trabajoRealizado: "Día de piernas",
    multimedia: ['https://www.youtube.com/results?search_query=videos+entrenamiento', 'https://www.entrenamientos.com/media/cache/exercise_375/uploads/exercise/media-sentadilla-con-barra-init-pos-8649.png'],
    descripcion: "Demasiada fatiga durante el entrenamiento",
    presencial: true,
    datosSalud: new Array<string>('71', '1200', '87'),
    id: 2
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
      this.guardarSesionesEnLocalStorage();
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
    if(this.sesiones.length > 0){
      sesion.id = this.sesiones.map(u => u.id).reduce((a, b) => Math.max(a, b)) + 1;
    } else {
      sesion.id = 0;
    }
    this.sesiones.push(sesion);
    this.sesiones.sort(this.sortByIDPlan);
    this.guardarSesionesEnLocalStorage();
    return of(sesion);
  }

  //EDITAR SESION
  putSesion(sesion: SesionDTO): Observable<SesionDTO> {
    console.log(sesion);
    let u = this.sesiones.find(u => u.id == sesion.id);
    if (!u) {
      console.log("iderror");
      return new Observable<SesionDTO>(observer => {
        observer.error('La sesion no existe');
      });
    }

    Object.assign(u, sesion);
    this.sesiones.sort(this.sortByIDPlan);
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
    this.sesiones.sort(this.sortByIDPlan);
    this.guardarSesionesEnLocalStorage();
    return of();
  }

  //SesionNuevaDTO a SesionDTO
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
    return (s0?.idPlan < s1?.idPlan) ? -1 : (s1?.idPlan > s0?.idPlan) ? 1 : 0; 
  }
}
