import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PlanComponent } from './pages/plan/plan.component';
import { FormularioSesionComponent } from './formulario-sesion/formulario-sesion.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {path: '', component: PlanComponent},
    {path: 'plan', component: PlanComponent},
    {path: 'home', component: HomeComponent}   // {path: '*', redirectTo: '', pathMatch: 'full'}
   
];  

NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
