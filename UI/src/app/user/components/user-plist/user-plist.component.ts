import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { iProduct } from '../../model/iProduct';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-user-plist',
  templateUrl: './user-plist.component.html',
  styleUrls: ['./user-plist.component.css']
})
export class UserPlistComponent implements OnInit {
  prodList: iProduct[];
  totProd:number;
  pageNumber:number = 1;
  searchProduct:string = '';
  selectedProduct:string = '';
  SortByParam: string = '';
  SortDirection: string = 'asc';

  constructor(private http : HttpClient , private productService: ProductService) { }

  ngOnInit(): void {
    this.pageNumber = 1;
    this.getData();
  }

  getData(){
    this.productService.getAllProduct(this.pageNumber , 8, this.SortByParam, this.SortDirection, this.searchProduct)
      .pipe(
        shareReplay()
      )
      .subscribe(response => {
      this.prodList = response.data;
      this.totProd = response.totProd;
    }, err=> {
      console.log("Can't call product service!");
    });
  }

  onProductFilter(){
    this.searchProduct = this.selectedProduct;
    this.getData();
  }

  onProductFilterClear(){
    this.searchProduct = '';
    this.selectedProduct = '';
    this.getData();
  }

  onSortDirection(){
    if(this.SortDirection == 'asc'){
      this.SortDirection = 'desc';
      this.getData();
    }
    else{
      this.SortDirection = 'asc';
      this.getData();
    }
  }

  onSortParamChange(){
    this.getData();
  }
}
