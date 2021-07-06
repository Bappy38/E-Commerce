import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule , FormControl, FormGroup } from '@angular/forms';

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
    pImage: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.warn(this.newProductForm.value);
  }
}
