import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';


import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

// guards

import { AdminGuard } from '../services/guards/admin.guard';

import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';




const childRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [VerificaTokenGuard], data: {titulo: 'Dashboard'} },
  { path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'} },
  { path: 'graficas1', component: Graficas1Component, data: {titulo: 'Graficas'} },
  { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'} },
  { path: 'rxjs', component: RxjsComponent, data: {titulo: 'RxJs'} },
  { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes del tema'} },
  { path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil de usuario'} },
  { path: 'busqueda/:termino', component: BusquedaComponent, data: {titulo: 'Buscador'} },
   // MANTENIMIENTOS

  { path: 'usuarios', component: UsuariosComponent, canActivate: [AdminGuard], data: {titulo: 'Mantenimiento de usuarios'} },

 { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimiento de hospitales'} },
 { path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimiento de Médicos'} },
 { path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Actualizar Médico'} },
 { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
]



@NgModule({
  declarations: [],
  imports:
    [RouterModule.forChild(childRoutes)
    ],
    exports: [
      RouterModule
    ]
})
export class ChildRoutesModule { }
