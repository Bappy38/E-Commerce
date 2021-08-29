import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { iProduct } from '../../model/iProduct';
import { iUserCart } from '../../model/iUserCart';
import { ProductService } from '../../services/product.service';
import { UserCartService } from '../../services/user-cart.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatDialog } from '@angular/material/dialog';
import { UserLoginComponent } from '../user-login/user-login.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


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
    private toastr : ToastrService , private userCartService: UserCartService,
    private router : Router, private http : HttpClient) { }

  ngOnInit(): void {
    this.productOrder = this.route.snapshot.params['id'];
    const reqProduct = {
      "id": this.productOrder
    }
    
    this.productService.getProduct(this.productOrder)
      .subscribe(response => {
        this.product = <iProduct>response;
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
    const orderedProduct = {
      id: this.product.id,
      pOrder: this.product.pOrder,
      pName: this.product.pName,
      pPrice: this.product.pPrice,
      pUnit: this.product.pUnit,
      pQuantity: this.Cnt,
      pImage: this.product.pImage,
      pDescription: this.product.pDescription
    }

    if(!this.isloggedIn()){
      this.openLoginDialog();
      return;
    }
    if(this.Cnt > this.product.pQuantity){
      this.toastr.error("Sorry! You can order "+ this.product.pQuantity + " " + this.product.pUnit + " only!");
      return;
    }

    this.userCartService.addProduct(orderedProduct).then(
      (val) => {
        this.toastr.success('Product added to cart successfully!');
      },
      (err) => {
        this.toastr.error('Add product to cart unsuccessfull!');
      }
    )
  }
}
