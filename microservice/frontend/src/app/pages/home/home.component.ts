import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormularioSesionComponent } from '../../formulario-sesion/formulario-sesion.component';
import { AsignacionEntrenamientoDTO, GestinDeEntrenamientosService, GestionDeCentrosYGerentesService, PlanDTO, SesionDTO } from '../../../openapi/lifefitAPI';
import {GestinDeInformacinDeSesionesDeLosClientesService} from '../../../openapi/lifefitAPI/api/gestinDeInformacinDeSesionesDeLosClientes.service';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { RouterLink, RouterOutlet , RouterLinkActive} from '@angular/router';

import { UsuariosService } from '../../sistema-usuario/services/usuarios.service';
import { UsersComponent } from '../../sistema-usuario/users/users.component';
import { PlanbackendFakeServiceTsService } from '../../planbackend.fake.service.ts.service';
import { Observable } from 'rxjs';
import { EditarSesionComponent } from '../../editar-sesion/editar-sesion.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormularioSesionComponent,
    NgbModule, 
    MatButtonModule,
    MatButtonToggleModule, RouterLink, RouterOutlet , RouterLinkActive,
    UsersComponent
  ],
  providers: [
    GestinDeEntrenamientosService
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  planList : PlanDTO[] = [];
  //sesiones: Observable<SesionDTO[]>;
  sesiones: SesionDTO[] = [];
  #showButton : boolean;
  #showPlanes : boolean;
  displayNotificationAdded : boolean;
  private selectedPlanId : undefined| number;


  constructor(private modalService: NgbModal, private usuarioService: UsuariosService, private servicioEntrenamiento: GestinDeEntrenamientosService
    , private servicioSesiones: GestinDeInformacinDeSesionesDeLosClientesService, private planesService: PlanbackendFakeServiceTsService) {
    this.#showButton = false;
    this.#showPlanes = false;
    this.displayNotificationAdded = false;
    //this.sesiones = new Observable<SesionDTO[]>();
  }

  public open(modal: any): void {
    const modalRef = this.modalService.open(modal);
  }

  ngOnInit() {
    this.sesiones = this.planesService.getListaSesiones();  //SUSTITUIR POR PETICION REAL DE SESIONES PARA CONECTAR CON EL BACKEND REAL
    this.getFakePlans();  //SUSTITUIR POR GETPLANS PARA REALES
    
  } 
  addForm(): void{
    this.#showButton = false;
    this.#showPlanes = false;
    const modalRef = this.modalService.open(FormularioSesionComponent);
    modalRef.componentInstance.planId = this.selectedPlanId;
    modalRef.result.then((result) => {
      if(result){
        this.notifyAddedSession();
      }
    }).catch((error)=>{
      console.log('Formulario rechazado')
    });
  }

  testBackend(): void{
    this.servicioEntrenamiento.getPlan(0).subscribe(plan =>{
      console.log(plan);
    });
  }

  getPlans(): PlanDTO[]{
    let plans : PlanDTO[] = [];
    let user_sesion = this.usuarioService.getUsuarioSesion();
    let user_id = user_sesion?.id;
    let asignaciones:AsignacionEntrenamientoDTO[] = [];
    this.servicioEntrenamiento.obtenerAsignaciones1(user_id).subscribe(asig => {
      asignaciones = asig;
    });
    for(let as of asignaciones){
      if(as.planes != undefined){
        for(let plan_as of as.planes){
          plans.push(plan_as);
        }
      }
    }
    return plans;
  }

  getFakePlans(): void{
    let plan : PlanDTO = {fechaInicio: new Date(),
      fechaFin: new Date(),
      reglaRecurrencia: "",
      idRutina: 3,
      id: 0};
    this.planList.push(plan);

    plan = {fechaInicio: new Date(),
      fechaFin: new Date(),
      reglaRecurrencia: "",
      idRutina: 3,
      id: 1};
    this.planList.push(plan);

    plan = {fechaInicio: new Date(),
      fechaFin: new Date(),
      reglaRecurrencia: "",
      idRutina: 3,
      id: 2};
    this.planList.push(plan);
  }


  set showButton(doShow: boolean){
    this.#showButton = doShow;
  }

  get showButton(){
    return this.#showButton;
  }

  get showPlanes(){
    return this.#showPlanes;
  }

  pressedButton(id : undefined | number){
    this.#showButton = true;
    this.selectedPlanId = id;
  }

  pressedAgregar(){
    this.#showPlanes = true;
  }

  notifyAddedSession() {
    this.displayNotificationAdded = true;
    setTimeout(() => {
        this.displayNotificationAdded = false;
    }, 3000);
  }

  pressedEditar(sesion: SesionDTO){
    const modalRef = this.modalService.open(EditarSesionComponent);
    modalRef.componentInstance.sesionInput = sesion;
    modalRef.componentInstance.sesionId = sesion.id;
    modalRef.result.then((result) => {
      if(result){
        
      }
    }).catch((error)=>{
      console.log('Formulario rechazado')
    });
  }
  pressedBorrar(id : number){
    this.planesService.deleteSesion(id);
  }
}
