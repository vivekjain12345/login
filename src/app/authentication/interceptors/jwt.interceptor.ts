import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { LoginService } from '@authentication/login.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private loginService: LoginService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser = this.loginService.currentUserValue;
        if(currentUser && currentUser.jwtToken){
            setHeaders: {
                Authorization: `Bearer ${currentUser.jwtToken}`
            }
        }
        return next.handle(request);
    }
}