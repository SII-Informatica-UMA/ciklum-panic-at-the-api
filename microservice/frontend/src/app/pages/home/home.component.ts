import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormularioSesionComponent } from '../../formulario-sesion/formulario-sesion.component';
import { GestinDeEntrenamientosService, PlanDTO } from '../../../openapi/lifefitAPI';
import {GestinDeInformacinDeSesionesDeLosClientesService} from '../../../openapi/lifefitAPI/api/gestinDeInformacinDeSesionesDeLosClientes.service';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormularioSesionComponent,
    NgbModule, 
    MatButtonModule,
  ],
  providers: [
    GestinDeEntrenamientosService
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  planList : PlanDTO[] = [];


  constructor(private modalService: NgbModal, private planService: GestinDeEntrenamientosService
    , private servicioSesiones: GestinDeInformacinDeSesionesDeLosClientesService) {
    
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  addForm(): void{
    this.modalService.open(FormularioSesionComponent);
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
}
