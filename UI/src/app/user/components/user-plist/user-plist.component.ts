import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-user-plist',
  templateUrl: './user-plist.component.html',
  styleUrls: ['./user-plist.component.css']
})
export class UserPlistComponent implements OnInit {
  prodList:any;

  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    this.http.get("https://localhost:5001/api/product/query")
      .subscribe(response => {
        this.prodList = response;
      })
  }

}
