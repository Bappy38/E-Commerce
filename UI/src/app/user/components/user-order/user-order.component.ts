import { Component, OnInit } from '@angular/core';
import { iOrder } from '../../model/iOrder';
import { HttpClient } from '@angular/common/http';
import { PdfExportService } from '../../services/pdf-export.service';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {
  orderList : iOrder[];
  panelOpenState = false;
  loggedUser: String;
  emptyOrder: boolean = true;

  constructor(private http : HttpClient, private invoice : PdfExportService) { }

  ngOnInit(): void {
    this.initData();
    console.log('Order!!!!!!!!!!!');
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

}
