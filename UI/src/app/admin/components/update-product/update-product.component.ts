import { Component, OnInit , Inject, AfterViewInit } from '@angular/core';

import {FormControl , FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import categories from 'src/assets/json/category.json';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit, AfterViewInit {
  product : any;
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

  constructor(private toastr : ToastrService , private http : HttpClient , private dialogRef: MatDialogRef<UpdateProductComponent>,
    @Inject(MAT_DIALOG_DATA)public data:any) { 
      this.product = data;
    }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.populateDropDowns();
  }

  populateDropDowns(){
    for(let category of categories){
      if(category.Name === this.product.category){
        this.newProductForm.value.Category = category.Id;
      }
    }

    for(let subCategory of categories[this.newProductForm.value.Category].SubCategory){
      if(subCategory.Name === this.product.subCategory){
        this.newProductForm.value.SubCategory = subCategory.Id;
      }
    }
    console.log(this.newProductForm.value.SubCategory);
  }

  getSubCategories(): any {
    if(!this.newProductForm.value.Category)
      return;
    return categories[this.newProductForm.value.Category].SubCategory;
  }

  processDriveLink(link:string):string
  {
    if(this.unchangedLink(link))
      return link;
      
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

  unchangedLink(link: string): boolean
  {
    var temp: string = 'https://drive.google.com/thumbnail?id=';
    var ret: boolean = true;

    for(let i=0 ; i<temp.length ; i++){
      if(temp[i] != link[i]){
        return false;
      }
    }
    return ret;
  }

  onSubmit(){
    const updatedProduct = {
      'Id': this.product.id,
      'SL' : this.newProductForm.value.SL,
      'Name' : this.newProductForm.value.Name,
      'Category': categories[this.newProductForm.value.Category].Name,
      'SubCategory': categories[this.newProductForm.value.Category].SubCategory[this.newProductForm.value.SubCategory].Name,
      'Price' : this.newProductForm.value.Price,
      'OldPrice' : this.newProductForm.value.OldPrice,
      'Unit' : this.newProductForm.value.Unit,
      'Quantity' : this.newProductForm.value.Quantity,
      'Image' : this.processDriveLink(this.newProductForm.value.Image),
      'Description': this.newProductForm.value.Description
    }

    console.log(updatedProduct);

    this.http.put("https://localhost:5001/api/product/update" , updatedProduct)
    .subscribe(response => {
      this.toastr.success("Product updated successfully!");
      this.newProductForm.reset();
      this.newProductForm.markAsUntouched();
    }, err => {
      this.toastr.error("Product update failed!");
    });

    this.dialogRef.close();
  }

  close(){
    this.dialogRef.close();
  }
}
