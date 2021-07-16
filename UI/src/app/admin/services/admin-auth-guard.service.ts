import { Injectable } from '@angular/core';

import {Router , CanActivate} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService {

  constructor(private router : Router , private jwtHelper : JwtHelperService) { }

  canActivate()
  {
    const token = localStorage.getItem("jwt");

    if(token && !this.jwtHelper.isTokenExpired(token) && this.jwtHelper.decodeToken(token).Role == "admin"){
      return true;
    }
    this.router.navigate(['admin-login']);
    return false;
  }
}
