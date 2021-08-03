/* Parallel http call is the main problem here **/

import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { iProduct } from '../model/iProduct';
import { JwtHelperService } from '@auth0/angular-jwt';
import { iUserCart } from '../model/iUserCart';
import { reject, resolve } from 'q';
import { EMPTY } from 'rxjs';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class UserCartService {

  userCart:iUserCart;
  User = {
    "UserName": sessionStorage.getItem('loggedUser'),
    "Password": "dummyPass"
  };

  constructor(private http : HttpClient,
              private jwtHelper : JwtHelperService) { }

  storeCart(){
    const promise = new Promise((resolve , reject) => {
      this.http.post("https://localhost:5001/api/usercart/query" , this.User)
        .subscribe(response => {
          this.userCart = <iUserCart>response;
          resolve('done');
        }, err => {
          reject('error');
        })
    });
    return promise;
  }

  async addProduct(product : iProduct){
    this.storeCart().then(
      (val) => {
        let productExist: Boolean = false;

        for(let kth in this.userCart.orderedProductList){
          if(this.userCart.orderedProductList[kth].pName == product.pName){
            this.userCart.orderedProductList[kth].pQuantity += product.pQuantity;
            productExist = true;
            break;
          }
        }

        const promise1 = new Promise((resolve , reject) => {
          if(!productExist){
            this.userCart.orderedProductList.push(product);
          }
          resolve('done');
        })

        promise1.then(
          (val) => {
            this.http.put("https://localhost:5001/api/usercart/update", this.userCart)
              .subscribe(response => {
                console.log('Ok');
              });
          }
        )
      }
    );
  }

  async removeProduct(product : iProduct)
  {
    this.storeCart().then(
      (val) => {
        this.userCart.orderedProductList.forEach( (item , index) => {
          if(item.pName == product.pName)
            this.userCart.orderedProductList.splice(index , 1);
        });
        this.http.put("https://localhost:5001/api/usercart/update", this.userCart)
          .subscribe();
        return 'Ok';
      }
    );
    return 'Error';
  }

  isloggedIn(){
    const token = localStorage.getItem("jwt");

    if(token && !this.jwtHelper.isTokenExpired(token) && this.jwtHelper.decodeToken(token).Role == 'user'){
      return true;
    }
    return false;
  }

}
