import { Component, OnInit } from '@angular/core';
import {FormGroup , FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  loginForm = new FormGroup({
    UserName: new FormControl(''),
    Password: new FormControl('')
  });

  constructor(private http : HttpClient , private toastr : ToastrService,
    private router : Router , private jwtHelper : JwtHelperService) { }

  ngOnInit(): void {
    if(this.isAdminAuthenticated())
      this.router.navigate(['admin-home']);
    else
      this.router.navigate(['admin-login']);
  }

  onSubmit(){
    const Credential = {
      "UserName": this.loginForm.value.UserName,
      "Password": this.loginForm.value.Password
    }
    console.log(Credential);
    this.http.post("https://localhost:5001/api/auth/admin-signin" , Credential)
      .subscribe(response => {
        this.toastr.success("Logged In Successfully!");
        const token = (<any>response).token;
        localStorage.setItem("jwt" , token);
        this.router.navigate(['admin-home']);
      }, err=>{
        console.log(err);
        this.toastr.error("Username and Password didn't match!");
      })
  }

  isAdminAuthenticated(){
    const token:string = localStorage.getItem("jwt");

    if(token != null && !this.jwtHelper.isTokenExpired(token))
      return true;
    else
      return false;
  }
}
