import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PlanComponent } from './pages/plan/plan.component';
import { FormularioSesionComponent } from './formulario-sesion/formulario-sesion.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ListadoUsuarioComponent } from './listado-usuario/listado-usuario.component';
import { PrincipalComponent } from './principal/principal.component';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
    //{path: '', component: PlanComponent},
    {path: '', component: UsersComponent},
    {path: 'plan', component: PlanComponent},
    {path: 'home', component: HomeComponent},   // {path: '*', redirectTo: '', pathMatch: 'full'}
    {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'forgotten-password',
        component: ForgottenPasswordComponent
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent
      },
      {
        path: 'usuarios',
        component: ListadoUsuarioComponent
      },
      {
        path: '',
        component: PrincipalComponent
      }
   
];  

NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
