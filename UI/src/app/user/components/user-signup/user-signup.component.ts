import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {
  signupForm = new FormGroup({
    FirstName: new FormControl(''),
    LastName: new FormControl(''),
    UserName: new FormControl(''),
    Password: new FormControl(''),
    ConfirmPassword: new FormControl('')
  });

  constructor(private toastr : ToastrService , private http : HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.signupForm.value.Password != this.signupForm.value.ConfirmPassword){
      this.toastr.error("Password not matched!");
      return;
    }

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

        window.location.reload();
        this.toastr.success('Welcome '+ Credential.UserName);
      }, err => {
        this.toastr.error('Username already exist! Try with another one.');
      });
  }
}
