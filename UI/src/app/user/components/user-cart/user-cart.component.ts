import { Component, OnInit } from '@angular/core';
import { iUserCart } from '../../model/iUserCart';
import { UserCartService } from '../../services/user-cart.service';
import { HttpClient } from '@angular/common/http';
import { iProduct } from '../../model/iProduct';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { YesNoDialogComponent } from 'src/app/common/yes-no-dialog/yes-no-dialog.component';
import { MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {
  myCart: iUserCart;
  totalCost: number = 0;
  User = {
    "UserName": sessionStorage.getItem('loggedUser'),
    "Password": "dummyPass"
  };

  constructor(private cartService: UserCartService, private http : HttpClient,
              private toastr : ToastrService, private dialog : MatDialog) { }

  ngOnInit(): void {
    this.storeCart();
  }

  storeCart()
  {
    this.totalCost = 0;
    this.http.post("https://localhost:5001/api/usercart/query" , this.User)
    .subscribe(response => {
      this.myCart = <iUserCart>response;
      if(this.myCart && this.myCart.orderedProductList && this.myCart.orderedProductList.length > 0){
        this.totalCost = 40;
        console.log('Hi!!!');

        for(let item of this.myCart.orderedProductList){
          this.totalCost += (item.pPrice * item.pQuantity);
        }
      }
    });
  }

  removeItem(product: iProduct)
  {
    this.cartService.removeProduct(product).then(
      (val) => {
        this.toastr.success("Item remove from cart!");
        this.myCart.orderedProductList.forEach( (item , index) => {
          if(item.pName == product.pName){
            this.myCart.orderedProductList.splice(index , 1);
            this.totalCost -= (item.pPrice * item.pQuantity);
          }
        });
      },
      (err) => {
        this.toastr.error("Removing item is unsuccessfull!");
      }
    );
  }

  clearCart()
  {
    this.myCart.orderedProductList.splice(0 , this.myCart.orderedProductList.length);
    this.http.post("https://localhost:5001/api/usercart/delete", this.myCart)
      .subscribe(reponse => {
        this.toastr.success("Cart cleared successfully!");
      }, err=> {
        this.toastr.error("Clearing cart unsuccessfull!");
      });
  }

  confirmDialog()
  {
    const obj = {
      title: 'Are you sure?',
      content: ''
    };

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true,
    dialogConfig.autoFocus = true,
    dialogConfig.width = "400px",
    dialogConfig.height = "200px"
    dialogConfig.data = obj;

    let dialogRef = this.dialog.open(YesNoDialogComponent , dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'true'){
        this.clearCart();
      }
    });
  }

}
