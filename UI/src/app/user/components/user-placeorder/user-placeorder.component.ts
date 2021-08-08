import { Component, OnInit , Input , Inject , Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { iOrder } from '../../model/iOrder';
import { iProduct } from '../../model/iProduct';

import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-placeorder',
  templateUrl: './user-placeorder.component.html',
  styleUrls: ['./user-placeorder.component.css']
})
export class UserPlaceorderComponent implements OnInit {
  orderForm : FormGroup;
  orderedProductList: any;

  constructor(
              public dialogRef : MatDialogRef<UserPlaceorderComponent>,
              @Inject(MAT_DIALOG_DATA)public data : any) {
    this.orderedProductList = data;
}

  ngOnInit(): void {
    this.initFormControl();
  }

  initFormControl(){
    this.orderForm = new FormGroup({
      OrderNo : new FormControl(Guid.create().toString()),
      Address : new FormControl('' , [Validators.required]),
      ContactNo: new FormControl('' , [Validators.required , Validators.minLength(11) , Validators.maxLength(11)]),
    });
  }

  onSubmit()
  {
    let currDate = new Date();
    let order: iOrder = {
      id: null,
      OrderNo : this.orderForm.value.OrderNo,
      UserName :  sessionStorage.getItem('loggedUser'),
      Address : this.orderForm.value.Address,
      Contact : this.orderForm.value.ContactNo,
      OrderedProductList : this.orderedProductList,
      OrderStatus: 'Preparing Order',
      OrderDate: currDate.toLocaleDateString() + ' ' + currDate.toLocaleTimeString(),
      TotalCost: 0
    }
    this.dialogRef.close({event: 'Submit' , data: order});
    console.log(order);
  }

  closeDialog(){
    this.dialogRef.close({event: 'Cancel'});
  }

}
