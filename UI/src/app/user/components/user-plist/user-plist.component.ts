import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { iProduct } from '../../model/iProduct';

@Component({
  selector: 'app-user-plist',
  templateUrl: './user-plist.component.html',
  styleUrls: ['./user-plist.component.css']
})
export class UserPlistComponent implements OnInit {
  prodList: iProduct[];
  totProd:number;
  page:number = 1;

  constructor(private http : HttpClient , private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProduct().subscribe(response => {
      this.prodList = response;
      this.totProd = this.prodList.length;
    }, err=> {
      console.log("Can't call product service!");
    });
    this.page = 1;
  }

}
