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
  public response: {dbPath: ''}
  imgPath: string;

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
      UserName: new FormControl(this.userName),
      ProfilePicture: new FormControl(this.userProfile.profilePicture)
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
      'Password': '',
      'ProfilePicture': ''
    }

    this.http.post("https://localhost:5001/api/auth/query-user" , dummyUser)
    .subscribe(response => {
      this.userProfile = response;
      this.initFormControl();
    });
  }

  onSubmit(){
    const updatedUser = {
      'Id': this.userProfile.id,
      'FirstName': this.updateProfileForm.value.FirstName,
      'LastName': this.updateProfileForm.value.LastName,
      'Email': this.updateProfileForm.value.Email,
      'Mobile': this.updateProfileForm.value.Mobile,
      'UserName': this.userProfile.userName,
      'Password': this.userProfile.password,
      'ProfilePicture': this.updateProfileForm.value.ProfilePicture
    }
    this.http.put("https://localhost:5001/api/auth/userdetail-update" , updatedUser)
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

  public uploadFinished = (event) => {
    this.response = event;
    this.updateProfileForm.value.ProfilePicture = this.userProfile.profilePicture = this.response.dbPath;
  }

  public createImgPath = (serverPath: string) => {
    return `https://localhost:5001/${serverPath}`;
  }
}
