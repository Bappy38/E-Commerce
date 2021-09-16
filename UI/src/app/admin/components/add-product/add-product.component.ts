import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule , FormControl, FormGroup } from '@angular/forms';

import {HttpClient} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'
import categories from 'src/assets/json/category.json';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  public categories: any = categories;

  newProductForm = new FormGroup({
    SL: new FormControl(''),
    Name: new FormControl(''),
    Category: new FormControl(null),
    SubCategory: new FormControl(null),
    Price: new FormControl(''),
    OldPrice: new FormControl(''),
    Unit: new FormControl(''),
    Quantity: new FormControl(''),
    Image: new FormControl(''),
    Description: new FormControl('')
  });

  constructor(private http : HttpClient , private toastr : ToastrService , private router : Router) { }

  ngOnInit(): void {
  }

  getSubCategories(): any {
    if(!this.newProductForm.value.Category)
      return;
    return categories[this.newProductForm.value.Category].SubCategory;
  }

  processDriveLink(link:string):string
  {
    var reqUrl:string = 'https://drive.google.com/thumbnail?id=';
    var cnt:number = 0;

    for(var char of link){
      if(char == '/')
        cnt++;
      if(cnt == 5 && char != '/')
        reqUrl += char;
    }
    return reqUrl;
  }

  onSubmit(){
    const newProduct = {
      'SL' : this.newProductForm.value.SL? this.newProductForm.value.SL: 10000,
      'Name' : this.newProductForm.value.Name,
      'Category': categories[this.newProductForm.value.Category].Name,
      'SubCategory': categories[this.newProductForm.value.Category].SubCategory[this.newProductForm.value.SubCategory].Name,
      'Price' : this.newProductForm.value.Price,
      'OldPrice' : this.newProductForm.value.OldPrice,
      'Unit' : this.newProductForm.value.Unit,
      'Quantity' : this.newProductForm.value.Quantity,
      'Image' : this.processDriveLink(this.newProductForm.value.Image),
      'Description': this.newProductForm.value.Description,
      'Rating': 5.0
    }

    this.http.post("https://localhost:5001/api/product/add" , newProduct)
    .subscribe(response => {
      this.toastr.success("Product added successfully!");
      this.router.navigate(['admin-home']);
    }, err => {
      this.toastr.error("Sorry! There're some invalid data in product details!");
      this.router.navigate['/'];
    });
  }
}
