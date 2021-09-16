import { AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from 'src/app/shared/services/product.service';
import { iProduct } from 'src/app/shared/model/iProduct';
import { shareReplay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import categories from 'src/assets/json/category.json';

@Component({
  selector: 'app-user-plist',
  templateUrl: './user-plist.component.html',
  styleUrls: ['./user-plist.component.css']
})
export class UserPlistComponent implements OnInit, AfterViewInit {

  public categories: any = categories;
  category: string;
  subCategory: string;
  prodList: iProduct[];
  totProd:number;
  pageNumber:number = 1;
  searchProduct:string = '';
  selectedProduct:string = '';
  SortByParam: string = '';
  SortDirection: string = 'asc';

  constructor(private http : HttpClient,
              private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit(): void {
  }

  getData(cat: string = '', subcat: string = ''){
    console.log("Called from user nav!");
    this.productService.getAllProduct(this.pageNumber , 8, this.SortByParam, this.SortDirection, this.searchProduct, cat, subcat)
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
