import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { iProduct } from '../../model/iProduct';
import { ProductService } from '../../services/product.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatDialog } from '@angular/material/dialog';
import { UserLoginComponent } from '../user-login/user-login.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-pdetail',
  templateUrl: './user-pdetail.component.html',
  styleUrls: ['./user-pdetail.component.css']
})
export class UserPdetailComponent implements OnInit {
  productOrder: string;
  product: iProduct;
  currentRate:number = 4.5;
  Cnt:number;


  constructor(private route : ActivatedRoute, private productService : ProductService,
    private jwtHelper : JwtHelperService, private dialog: MatDialog , 
    private toastr : ToastrService) { }

  ngOnInit(): void {
    this.productOrder = this.route.snapshot.params['id'];

    
    this.productService.getProduct(this.productOrder).subscribe(response => {
      this.product = response;
    });
    this.Cnt = 1;
  }

  toggleMore(){
    if(this.Cnt < this.product.pQuantity)
      this.Cnt++;
  }
  toggleLess(){
    if(this.Cnt > 1)
      this.Cnt--;
  }

  isloggedIn(){
    const token = localStorage.getItem("jwt");

    if(token && !this.jwtHelper.isTokenExpired(token) && this.jwtHelper.decodeToken(token).Role == 'user'){
      return true;
    }
    return false;
  }

  openLoginDialog(){ 
    let dialogRef = this.dialog.open(UserLoginComponent , {width: '400px'});

    dialogRef.afterClosed().subscribe(result => {
      ;
    });
  }

  addToCart(){
    console.log(this.Cnt);
    if(!this.isloggedIn())
      this.openLoginDialog();
    if(this.Cnt > this.product.pQuantity){
      this.toastr.error("Sorry! You can order "+ this.product.pQuantity + " " + this.product.pUnit + " only!");
      return;
    }
  }
}