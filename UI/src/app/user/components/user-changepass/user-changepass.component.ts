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

  onSubmit(){
    if(!this.isUserAuthenticated()){
      this.initFormControl();
      this.toastr.warning("Please login first!");
      return;
    }

    const dummyUser = {
      'FirstName': '',
      'LastName': '',
      'UserName': sessionStorage.getItem('loggedUser'),
      'Password': ''
    }

    this.http.post("https://localhost:5001/api/auth/query-user" , dummyUser)
    .subscribe(expectedUser => {
      this.updatedUser = expectedUser;

      if(this.updatedUser.password != this.changePassForm.value.CurrPass){
        this.toastr.error("Your entered current password is not correct!");
        this.initFormControl();
        return;
      }

      this.updatedUser.Password = this.changePassForm.value.NewPass;

      this.http.put("https://localhost:5001/api/auth/userdetail-update" , this.updatedUser)
      .subscribe(response => {
        this.initFormControl();
        this.toastr.success("Password has been changed successfully!");
      }, err=> {
        this.initFormControl();
        this.toastr.error("Sorry! There was an error!");
      });
    }, err=> {
      this.initFormControl();
      this.toastr.error("Sorry! There was an error!");
    });
  }

  onCancel(){
    this.initFormControl();
  }
}
