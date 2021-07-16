import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog , MatDialogConfig, MatDialogModule} from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {

  constructor(private router : Router , private dialog : MatDialog) { }

  ngOnInit(): void {
  }
  
  addProduct(){
    this.router.navigate(['add-product']);
  }

  logOut(){
    localStorage.removeItem("jwt");
    this.router.navigate(['admin-login']);
  }

}
