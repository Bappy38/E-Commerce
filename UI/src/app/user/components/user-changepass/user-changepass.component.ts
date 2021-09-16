import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-user-changepass',
  templateUrl: './user-changepass.component.html',
  styleUrls: ['./user-changepass.component.css']
})
export class UserChangepassComponent implements OnInit {
  changePassForm: FormGroup;
  updatedUser:any;

  constructor(private http : HttpClient , private toastr : ToastrService,
    private jwtHelper : JwtHelperService) { }

  ngOnInit(): void {
    this.initFormControl();
  }

  initFormControl(){
    this.changePassForm = new FormGroup({
      'CurrPass': new FormControl('' , [Validators.required]),
      'NewPass': new FormControl('' , [Validators.required]),
      'ConfirmNewPass': new FormControl('' , [Validators.required])
    }, [this.passMatchValidator , this.passChangeValidator]);
  }

  passMatchValidator(fg : FormGroup): Validators{
    return fg.get('NewPass').value == fg.get('ConfirmNewPass').value? null:
    {notmatched: true};
  }

  passChangeValidator(fg : FormGroup): Validators{
    return fg.get('CurrPass').value != fg.get('NewPass').value? null:
    {notchanged: true};
  }

  isUserAuthenticated(){
    const token:string = localStorage.getItem("jwt");

    if(token != null && !this.jwtHelper.isTokenExpired(token) && this.jwtHelper.decodeToken(token).Role == 'user')
      return true;
    else
      return false;
  }

  isOldPasswordMatched(){
    const dummyCredential = {
      'UserName': sessionStorage.getItem('loggedUser'),
      'Password': this.changePassForm.value.CurrPass
    }
    return this.http.post("https://localhost:5001/api/auth/user-signin" , dummyCredential);
  }

  getExpectedUser(){
    const dummyUser = {
      'FirstName': '',
      'LastName': '',
      'Email': '',
      'Mobile': '',
      'UserName': sessionStorage.getItem('loggedUser'),
      'Password': ''
    }
    
    return this.http.post("https://localhost:5001/api/auth/query-user" , dummyUser);
  }

  changePassword()
  {
    this.getExpectedUser().subscribe(expectedUser => {
      this.updatedUser = expectedUser;
      this.updatedUser.Password = this.changePassForm.value.NewPass;

      this.http.put("https://localhost:5001/api/auth/userpassword-update" , this.updatedUser)
      .subscribe(response => {
        this.initFormControl();
        this.toastr.success("Password has been changed successfully!");
      }, err=> {
        this.initFormControl();
        this.toastr.error("Sorry! There was an error!");
      });
    });
  }

  onSubmit(){
    if(!this.isUserAuthenticated()){
      this.initFormControl();
      this.toastr.warning("Please login first!");
      return;
    }

    this.isOldPasswordMatched().subscribe(response => {
      console.log('Current password matched!');
      this.changePassword();
    },
    err => {
      this.toastr.error('Current password does not matched!');
      return;
    });
  }

  onCancel(){
    this.initFormControl();
  }
}
