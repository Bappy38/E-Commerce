import { Component, OnInit } from '@angular/core';
import { iOrder } from 'src/app/user/model/iOrder';
import { HttpClient } from '@angular/common/http';
import { PdfExportService } from 'src/app/user/services/pdf-export.service';

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
    {value: 'Order Shipped' , viewValue: 'Shipped'},
    {value: 'Delivered' , viewValue: 'Delivered'},
    {value: 'Cancelled' , viewValue: 'Cancelled'}
  ]

  constructor(private http : HttpClient, private invoice : PdfExportService) { }

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
    //Handle update order in server side & implement necessarycode here
  }
}
