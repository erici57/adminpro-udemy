import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// modulos
import { PagesRoutingModule } from './pages/pages-routing.module';

import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';





const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NopagefoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true} ),
            PagesRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
