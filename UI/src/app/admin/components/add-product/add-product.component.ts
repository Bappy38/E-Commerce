import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule , FormControl, FormGroup } from '@angular/forms';

import {HttpClient} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  newProductForm = new FormGroup({
    pOrder: new FormControl(''),
    pName: new FormControl(''),
    pPrice: new FormControl(''),
    pUnit: new FormControl(''),
    pQuantity: new FormControl(''),
    pImage: new FormControl(''),
    pDescription: new FormControl('')
  });

  constructor(private http : HttpClient , private toastr : ToastrService , private router : Router) { }

  ngOnInit(): void {
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
      'pOrder' : this.newProductForm.value.pOrder,
      'pName' : this.newProductForm.value.pName,
      'pPrice' : this.newProductForm.value.pPrice,
      'pUnit' : this.newProductForm.value.pUnit,
      'pQuantity' : this.newProductForm.value.pQuantity,
      'pImage' : this.processDriveLink(this.newProductForm.value.pImage),
      'pDescription': this.newProductForm.value.pDescription
    }

    this.http.post("https://localhost:5001/api/product/add" , newProduct)
    .subscribe(response => {
      this.toastr.success("Product added successfully!");
      this.newProductForm.reset();
      window.location.reload();
    }, err => {
      this.toastr.error("Sorry! There're some invalid data in product details!");
      this.router.navigate['/'];
    });
  }
}
