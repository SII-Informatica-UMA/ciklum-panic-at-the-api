import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormularioSesionComponent } from '../../formulario-sesion/formulario-sesion.component';
import { GestinDeEntrenamientosService, PlanDTO } from '../../../openapi/lifefitAPI';
import {GestinDeInformacinDeSesionesDeLosClientesService} from '../../../openapi/lifefitAPI/api/gestinDeInformacinDeSesionesDeLosClientes.service';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

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


  constructor(private modalService: NgbModal, private planService: GestinDeEntrenamientosService
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
    this.planService.getPlan(0).subscribe(plan =>{
      console.log(plan);
    });
  }

  ngOnInit() {
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
