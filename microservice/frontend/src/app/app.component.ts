import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormularioSesionComponent} from './formulario-sesion/formulario-sesion.component';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormularioSesionComponent,
    NgbModule, 
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  
  constructor(private modalService: NgbModal) {
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  addForm(): void{
    this.modalService.open(FormularioSesionComponent);
  }



}

/*
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormularioSesionComponent } from '../formulario-sesion/formulario-sesion.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormularioSesionComponent, NgbModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';

  constructor(private modalService: NgbModal) {
  }

  addForm(): void{
    this.modalService.open(FormularioSesionComponent);
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }
}
*/