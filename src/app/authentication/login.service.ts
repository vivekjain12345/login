import { Injectable } from '@angular/core';
import {User} from '@models/user';
import {HttpClient} from '@angular/common/http'
import {BehaviorSubject,Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
private userSubject:BehaviorSubject<User>;
public currentUser: Observable<User>;

  constructor(private http:HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('loggedInUser')));
    this.currentUser = this.userSubject.asObservable();
   }

   public get currentUserValue():User{
     return this.userSubject.value;
   }

   public login(user:User):Observable<any>{
     return this.http.post(`apiPath`,{user}).pipe(map(response=>{
       if(response && response['jwtToken']){
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        this.userSubject.next(user);
       }
       return response;
     }));
   }

   public logout(){
    localStorage.removeItem('loggedInUser');
    this.userSubject.next(null);
   }

}
