import { Component } from '@angular/core';
import {RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import { UsersComponent } from '../../sistema-usuario/users/users.component';

@Component({
  selector: 'app-init',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, RouterOutlet, UsersComponent],
  templateUrl: './init.component.html',
  styleUrl: './init.component.css'
})
export class InitComponent {

}
