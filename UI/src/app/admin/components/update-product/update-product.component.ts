import { Component, OnInit , Inject } from '@angular/core';

import {ReactiveFormsModule , FormControl , FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  product : any;

  newProductForm = new FormGroup({
    pOrder: new FormControl(''),
    pName: new FormControl(''),
    pPrice: new FormControl(''),
    pUnit: new FormControl(''),
    pQuantity: new FormControl(''),
    pImage: new FormControl(''),
    pDescription: new FormControl('')
  });

  constructor(private toastr : ToastrService , private http : HttpClient , 
    @Inject(MAT_DIALOG_DATA)public data:any) { 
      this.product = data;
    }

  ngOnInit(): void {
  }

  onSubmit(){
    const updatedProduct = {
      'pOrder' : this.newProductForm.value.pOrder,
      'pName' : this.newProductForm.value.pName,
      'pPrice' : this.newProductForm.value.pPrice,
      'pUnit' : this.newProductForm.value.pUnit,
      'pQuantity' : this.newProductForm.value.pQuantity,
      'pImage' : this.newProductForm.value.pImage,
      'pDescription': this.newProductForm.value.pDescription
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
  }

}
