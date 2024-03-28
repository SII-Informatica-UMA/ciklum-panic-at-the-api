import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageComponent } from '../page/page.component';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterOutlet,
    PageComponent
  ],
  providers: [HttpClient,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
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