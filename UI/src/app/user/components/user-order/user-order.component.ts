import { Component, OnInit } from '@angular/core';
import { iOrder } from 'src/app/shared/model/iOrder';
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
    console.log(this.orderList);
  }

  initData(){
    this.http.post("https://localhost:5001/api/order/single-query", this.getUser())
      .subscribe(response => {
        this.orderList = <iOrder[]>response;
    });
  }

  getUser(){
    return {
      UserName : sessionStorage.getItem('loggedUser'),
      Password : ''
    }
  }

  invoicePrint(order: any){
    this.invoice.exportPDF(order);
  }

}
