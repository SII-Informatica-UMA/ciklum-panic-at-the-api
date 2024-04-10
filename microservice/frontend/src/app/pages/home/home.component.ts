import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormularioSesionComponent } from '../../formulario-sesion/formulario-sesion.component';
import { AsignacionEntrenamientoDTO, GestinDeEntrenamientosService, GestionDeCentrosYGerentesService, PlanDTO } from '../../../openapi/lifefitAPI';
import {GestinDeInformacinDeSesionesDeLosClientesService} from '../../../openapi/lifefitAPI/api/gestinDeInformacinDeSesionesDeLosClientes.service';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormularioSesionComponent,
    NgbModule, 
    MatButtonModule,
    MatButtonToggleModule, 
  ],
  providers: [
    GestinDeEntrenamientosService
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  planList : PlanDTO[] = [];
  #showButton : boolean;
  displayNotificationAdded : boolean;
  private selectedPlanId : undefined| number;


  constructor(private modalService: NgbModal, private usuarioService: UsuariosService, private servicioEntrenamiento: GestinDeEntrenamientosService
    , private servicioSesiones: GestinDeInformacinDeSesionesDeLosClientesService) {
    this.#showButton = false;
    this.displayNotificationAdded = false;
  }

  public open(modal: any): void {
    const modalRef = this.modalService.open(modal);
  }

  addForm(): void{
    const modalRef = this.modalService.open(FormularioSesionComponent);
    modalRef.componentInstance.planId = this.selectedPlanId;
    modalRef.result.then((result) => {
      if(result){
        this.notifyAddedSession();
      }
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

  ngOnInit() {

    this.getFakePlans();
    
  } 

  set showButton(doShow: boolean){
    this.#showButton = doShow;
  }

  get showButton(){
    return this.#showButton;
  }

  pressedButton(id : undefined | number){
    this.#showButton = true;
    this.selectedPlanId = id;
  }

  notifyAddedSession() {
    this.displayNotificationAdded = true;
    setTimeout(() => {
        this.displayNotificationAdded = false;
    }, 3000);
}
}
