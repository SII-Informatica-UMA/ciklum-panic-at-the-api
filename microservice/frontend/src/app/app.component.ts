import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet , RouterLinkActive} from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PlanComponent } from './pages/plan/plan.component';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import {GestinDeInformacinDeSesionesDeLosClientesService} from '../openapi/lifefitAPI/api/gestinDeInformacinDeSesionesDeLosClientes.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterOutlet, RouterLink, RouterLinkActive,
    HomeComponent,
    PlanComponent  
  ],
  providers: 
  [HttpClient, GestinDeInformacinDeSesionesDeLosClientesService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Ciklum';
  option: string = '';
  constructor(private servicioSesiones: GestinDeInformacinDeSesionesDeLosClientesService){}

  ngOnInit(): void {
    
  }

  opcion(opt : string){

  }


  
}

