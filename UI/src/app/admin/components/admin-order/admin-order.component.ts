import { Component, OnInit, ViewChildren } from '@angular/core';
import { iOrder } from 'src/app/shared/model/iOrder';
import { HttpClient } from '@angular/common/http';
import { PdfExportService } from 'src/app/user/services/pdf-export.service';
import { MatDialog , MatDialogConfig } from '@angular/material/dialog';
import { YesNoDialogComponent } from 'src/app/shared/components/yes-no-dialog/yes-no-dialog.component';
import { ToastrService } from 'ngx-toastr';

interface Status {
  value: string,
  viewValue: string
}

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent implements OnInit {
  orderList : iOrder[];
  panelOpenState = false;
  loggedUser: String;
  emptyOrder: boolean = true;

  newOrderStatus: string = null;

  options: Status[] = [
    {value: 'Preparing Order' , viewValue: 'Preparing'},
    {value: 'Ready to deliver' , viewValue: 'Ready'},
    {value: 'Delivered' , viewValue: 'Delivered'},
    {value: 'Cancelled' , viewValue: 'Cancelled'}
  ]

  constructor(private http : HttpClient, private invoice : PdfExportService,
              private dialog : MatDialog, private toastr : ToastrService) { }

  @ViewChildren('orderRef') OrderRef;

  ngOnInit(): void {
    this.initData();
  }

  initData(){
    this.http.get("https://localhost:5001/api/order/query")
      .subscribe(response => {
        this.orderList = <iOrder[]>response;
    });
    this.loggedUser = sessionStorage.getItem('loggedUser');
  }

  invoicePrint(order: any){
    this.invoice.exportPDF(order);
  }

  statusChange(changedOrder:iOrder){
    changedOrder.OrderStatus = this.newOrderStatus;
    this.http.put("https://localhost:5001/api/order/update" , changedOrder)
      .subscribe(response => {
        this.initData();
    });
  }

  removeOrder(order:any){
      const obj = {
        title: 'Confirm Delete',
        content: 'Are you sure?'
      };
  
      let dialogRef = this.dialog.open(YesNoDialogComponent , {
        minWidth: '400px',
        minHeight: '200px',
        data : obj
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result == 'true'){
          this.http.post("https://localhost:5001/api/order/delete" , order)
            .subscribe(response => {
              this.toastr.success("The order is deleted successfully!");
              this.initData();
            }, err => {
              this.toastr.error("You've already delete this order");
            });
        }
      })
  }
}
