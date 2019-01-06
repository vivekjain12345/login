import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {LoginService} from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private loginService:LoginService,private router:Router) { }

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    const currentUser = this.loginService.currentUserValue;
    if(currentUser && currentUser.jwtToken){
      return true;
    }
    this.router.navigate(['/login'],{queryParams:{returnUrl : state.url} });
    return false;
  }
}
