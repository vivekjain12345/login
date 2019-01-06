import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators'
import {LoginService} from '@authentication/login.service';
import {User} from '@models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl:string;
  error =false;
  loading=false;

  constructor(private fb :FormBuilder,private activateRoute:ActivatedRoute,
    private router: Router,private loginService: LoginService) {
      this.returnUrl = this.activateRoute.snapshot.queryParams['returnUrl'] || '/';
     }

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName :['',Validators.required],
      password:['',Validators.required]
    });
    this.loginService.logout();
  }

  onSubmit(){
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    let user:User={
      username: this.loginForm.controls['userName'].value,
      password : this.loginForm.controls['password'].value
    }

      this.loginService.login(user).subscribe((user:User)=>{
        if(user && user.jwtToken)
          this.router.navigate([this.returnUrl]);
        else{
          this.error =true;
          this.loading = false;
        }
      }
      ,error=>{
        this.error =true;
        this.loading = false;
      });
  }

}
