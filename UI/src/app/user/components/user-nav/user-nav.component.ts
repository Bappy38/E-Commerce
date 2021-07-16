import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatDialog , MatDialogConfig } from '@angular/material/dialog';
import { UserLoginComponent } from '../user-login/user-login.component';
import { UserSignupComponent } from '../user-signup/user-signup.component';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit {
  currUser:string;

  constructor(private jwtHelper : JwtHelperService , 
    private dialog : MatDialog) { }

  ngOnInit(): void {
    this.currUser = sessionStorage.getItem('loggedUser');
  }

  logOut(){
    localStorage.removeItem("jwt");
  }

  isUserAuthenticated(){
    const token:string = localStorage.getItem("jwt");

    if(token != null && !this.jwtHelper.isTokenExpired(token))
      return true;
    else
      return false;
  }

  openLoginDialog(){ 
    let dialogRef = this.dialog.open(UserLoginComponent , {width: '400px'});

    dialogRef.afterClosed().subscribe(result => {
      ;
    });
  }

  openSignUpDialog(){ 
    let dialogRef = this.dialog.open(UserSignupComponent , {width: '400px'});

    dialogRef.afterClosed().subscribe(result => {
      ;
    });
  }

}
