import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatDialog , MatDialogConfig } from '@angular/material/dialog';
import { UserLoginComponent } from '../user-login/user-login.component';
import { UserSignupComponent } from '../user-signup/user-signup.component';
import { UserPlistComponent } from '../user-plist/user-plist.component';
import { Router } from '@angular/router';
import categories from 'src/assets/json/category.json';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit, AfterViewInit {
  dropdownState:boolean = false;
  currUser:string;
  public categories: any = categories;

  constructor(private jwtHelper : JwtHelperService, 
              private dialog : MatDialog,
              private router : Router) { }

  ngOnInit(): void {
    this.currUser = sessionStorage.getItem('loggedUser');
  }

  ngAfterViewInit(): void {
    this.currUser = sessionStorage.getItem('loggedUser');
  }

  logOut(){
    localStorage.removeItem("jwt");
    sessionStorage.removeItem('loggedUser');
  }

  isUserAuthenticated(){
    const token:string = localStorage.getItem("jwt");

    if(token != null && !this.jwtHelper.isTokenExpired(token) && this.jwtHelper.decodeToken(token).Role == 'user')
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

  gotoSignUp(){
    this.router.navigate(['user-signup']);
  }

  gotoChangePass(){
    this.router.navigate(['user-changepass']);
  }

  gotoUserProfile(){
    this.router.navigate(['user-profile']);
  }

  gotoCart(){
    if(this.isUserAuthenticated())
      this.router.navigate(['/user-cart']);
    else
      this.openLoginDialog();
  }

  gotoOrder(){
    if(this.isUserAuthenticated())
      this.router.navigate(['my-order']);
    else
      this.openLoginDialog();
  }

  gotoCustomerCare(){
    this.router.navigate(['/customer-care']);
  }

  setCategory(cat:string, subcat: string){
    const id: string = cat + subcat;
    const url: string = "/home/" + id;
    this.router.navigate([url]);
  }

  changeDropdownState(){
    if(this.dropdownState)
      this.dropdownState = false;
    else
      this.dropdownState = true;
  }
}
