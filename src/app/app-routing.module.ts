import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent} from "@app/login/login.component";
import {HomeComponent} from "@app/home/home.component"
import {AuthGuardService} from "@authentication/auth-guard.service";

const routes: Routes = [
  {path: 'login',component: LoginComponent},
  {path: '',component: HomeComponent,canActivate:[AuthGuardService]},
  {path: '**',component: HomeComponent,canActivate:[AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
