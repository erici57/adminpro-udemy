import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { PagesComponent } from './pages.component';




const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        canLoad: [LoginGuardGuard],
        loadChildren: () => import('./child-routes.module').then( m => m.ChildRoutesModule )

     },
  ];

@NgModule({
    imports:
    [RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
  })
  export class PagesRoutingModule { }
