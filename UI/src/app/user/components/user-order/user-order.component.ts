import { Component, OnInit } from '@angular/core';
import { iOrder } from '../../model/iOrder';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {
  orderList : iOrder[];
  panelOpenState = false;
  loggedUser: String;

  constructor(private http : HttpClient) { }

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

}
