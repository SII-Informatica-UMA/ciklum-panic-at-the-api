import { Component } from '@angular/core';
import { FormularioSesionComponent } from '../../formulario-sesion/formulario-sesion.component';
import { RouterLink, RouterOutlet , RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [
    FormularioSesionComponent,
    RouterOutlet, RouterLink, RouterLinkActive
  ],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.css'
})
export class PlanComponent {


}
