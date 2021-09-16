/* Parallel http call is the main problem here **/

import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { iProduct } from 'src/app/shared/model/iProduct';
import { JwtHelperService } from '@auth0/angular-jwt';
import { iUserCart } from '../model/iUserCart';

@Injectable({
  providedIn: 'root'
})
export class UserCartService {

  userCart:any;
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
          if(this.userCart.orderedProductList[kth].Name == product.Name){
            this.userCart.orderedProductList[kth].Quantity += product.Quantity;
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

  async removeProduct(product : any)
  {
    this.storeCart().then(
      (val) => {
        this.userCart.orderedProductList.forEach( (item , index) => {
          if(item.name == product.name)
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
