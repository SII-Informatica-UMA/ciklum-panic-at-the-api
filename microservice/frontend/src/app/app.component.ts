import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import {GestinDeInformacinDeSesionesDeLosClientesService} from '../openapi/lifefitAPI/api/gestinDeInformacinDeSesionesDeLosClientes.service';


@Component({
    selector: 'app-root',
    standalone: true,
    providers: [HttpClient, GestinDeInformacinDeSesionesDeLosClientesService],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
        HttpClientModule,
        RouterOutlet,
        HomeComponent,
        RouterLink,

    ]
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

