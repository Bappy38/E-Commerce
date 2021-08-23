import { Component, OnInit, ViewChild } from '@angular/core';

import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import { MatDialog , MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ProductService } from 'src/app/user/services/product.service';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  prodList:any;
  totProd:number;
  pageNumber:number = 1;

  constructor(private router : Router , private http : HttpClient , 
    private dialog : MatDialog , private toastr : ToastrService,
    private productService: ProductService) { }
  
  ngOnInit(): void {
      this.pageNumber = 1;
      this.productService.productsCount()
      .pipe(
        shareReplay()
      )
      .subscribe(response => {
        this.totProd = response;
        console.log(this.totProd);
      })
      this.getData();
  }

  getData(){
    this.productService.getAllProduct(this.pageNumber , 8)
      .pipe(
        shareReplay()
      )
      .subscribe(response => {
      this.prodList = response;
    }, err=> {
      console.log("Can't call product service!");
    });
  }
}
