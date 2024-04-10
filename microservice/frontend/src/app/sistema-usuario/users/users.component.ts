import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';

import { HttpClientModule } from '@angular/common/http';



@Component({
    selector: 'app-users',
    standalone: true,
    templateUrl: './users.component.html',
    styleUrl: './users.component.css',

    imports: [HttpClientModule, RouterOutlet, CommonModule, RouterLink, FormsModule, TitleCasePipe],
    providers: [ HttpClientModule]


})
export class UsersComponent {
  _rolIndex: number = 0

  constructor(private usuarioService: UsuariosService, private router: Router) {
    this.actualizarRol()
  }

  get rolIndex() {
    return this._rolIndex;
  }

  set rolIndex(i: number) {
    this._rolIndex = i;
    this.actualizarRol();
  }

  actualizarRol() {
    let u = this.usuarioSesion;
    if (u) {
      this.usuarioService.rolCentro = u.roles[this.rolIndex];
    } else {
      this.usuarioService.rolCentro = undefined;
    }
  }

  get rol() {
    return this.usuarioService.rolCentro;
  }

  get usuarioSesion() {
    return this.usuarioService.getUsuarioSesion();
  }

  logout() {
    this.usuarioService.doLogout();
    this.actualizarRol();
    this.router.navigateByUrl('/login');
  }
}
