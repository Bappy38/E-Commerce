import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginForm = new FormGroup({
    UserName: new FormControl(''),
    Password: new FormControl('')
  });

  constructor(private http : HttpClient , private toastr : ToastrService,
    private router : Router , private jwtHelper : JwtHelperService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const Credential = {
      "UserName": this.loginForm.value.UserName,
      "Password": this.loginForm.value.Password
    }

    this.http.post("https://localhost:5001/api/auth/user-signin" , Credential)
      .subscribe(response => {
        const token = (<any>response).token;
        localStorage.setItem("jwt" , token);

        sessionStorage.removeItem('loggedUser');
        sessionStorage.setItem('loggedUser' , Credential.UserName);

        this.router.navigate(['']);
        this.toastr.success('Welcome '+ Credential.UserName);
      }, err => {
        this.toastr.error('Username and password did not match');
      })
  }
}
