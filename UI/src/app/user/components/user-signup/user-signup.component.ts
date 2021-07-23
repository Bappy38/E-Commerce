import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {
  signupForm:FormGroup;

  constructor(private toastr : ToastrService , private http : HttpClient,
    private router : Router) { }

  ngOnInit(): void {
    this.initFormControl();
  }

  initFormControl(){
    this.signupForm = new FormGroup({
      FirstName : new FormControl(null),
      LastName : new FormControl(null),
      Email: new FormControl(null , [Validators.required , Validators.email]),
      Mobile: new FormControl(null , [Validators.required , Validators.minLength(11)]),
      UserName : new FormControl(null ,  Validators.required),
      Password : new FormControl(null , [Validators.required , Validators.minLength(8)]),
      ConfirmPassword : new FormControl(null , [Validators.required])
    } , this.passMatchValidator);
  }

  passMatchValidator(fg : FormGroup): Validators{
    return fg.get('Password').value == fg.get('ConfirmPassword').value ? null:
    {notmatched: true}
  }

  onSubmit(){
    const Credential = {
      "FirstName": this.signupForm.value.FirstName,
      "LastName": this.signupForm.value.LastName,
      "UserName": this.signupForm.value.UserName,
      "Password": this.signupForm.value.Password
    }

    this.http.post("https://localhost:5001/api/auth/user-signup" , Credential)
      .subscribe(response => {
        const token = (<any>response).token;
        localStorage.setItem("jwt" , token);

        sessionStorage.removeItem('loggedUser');
        sessionStorage.setItem('loggedUser' , Credential.UserName);

        this.router.navigate(['/']);
        window.location.reload();
        this.toastr.success('Welcome '+ Credential.UserName);
      }, err => {
        this.toastr.error('Username already exist! Try with another one.');
      });
  }
}
