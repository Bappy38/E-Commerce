import { Component, OnInit } from '@angular/core';
import { MatLineModule } from '@angular/material/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userName: string;
  userProfile: any;

  updateProfileForm: FormGroup;

  constructor(private http : HttpClient, private toastr : ToastrService) { }

  ngOnInit(): void {
    this.getUser();
  }

  initFormControl(){
    this.updateProfileForm = new FormGroup({
      FirstName: new FormControl(this.userProfile.firstName),
      LastName: new FormControl(this.userProfile.lastName),
      Mobile: new FormControl(this.userProfile.mobile, [Validators.required , Validators.minLength(11)]),
      Email: new FormControl(this.userProfile.email, [Validators.required , Validators.email]),
      UserName: new FormControl(this.userName)
    });
  }

  async getUser(){
    this.userName = sessionStorage.getItem('loggedUser');
    const dummyUser = {
      'FirstName': '',
      'LastName': '',
      'UserName': this.userName,
      'Email': '',
      'Mobile': '',
      'Password': ''
    }

    this.http.post("https://localhost:5001/api/auth/query-user" , dummyUser)
    .subscribe(response => {
      this.userProfile = response;
      this.initFormControl();
    });
  }

  onSubmit(){
    this.userProfile.FirstName = this.updateProfileForm.value.FirstName;
    this.userProfile.LastName = this.updateProfileForm.value.LastName;
    this.userProfile.Mobile = this.updateProfileForm.value.Mobile;
    this.userProfile.Email = this.updateProfileForm.value.Email
    this.http.put("https://localhost:5001/api/auth/userdetail-update" , this.userProfile)
    .subscribe(response => {
      this.toastr.success('Profile updated successfully!');
    }, err=>{
      this.toastr.error('Unsuccessful attempt! Please try again.');
    });
  }

  onCancel(){
    this.initFormControl();
    window.location.reload();
  }

}
