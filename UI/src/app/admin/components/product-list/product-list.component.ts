import { Component, OnInit, ViewChild } from '@angular/core';

import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import { MatDialog , MatDialogConfig } from '@angular/material/dialog';
import {AddProductComponent} from '../add-product/add-product.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  prodList:any;
  totProd:number;
  page:number = 1;

  constructor(private router : Router , private http : HttpClient , 
    private dialog : MatDialog , private toastr : ToastrService) { }

  @ViewChild(MatPaginator) paginator : MatPaginator;
  
  ngOnInit(): void {
    this.http.get("https://localhost:5001/api/product/query")
      .subscribe(response => {
        this.prodList = response;
      });
      this.totProd = this.prodList.length;
  }

  openAddDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    dialogConfig.height = "600px";

    let dialogRef = this.dialog.open(AddProductComponent , dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'true'){
        console.log("Added successfully!");
      }
    });
  }

  logOut(){
    localStorage.removeItem("jwt");
    this.router.navigate(['admin-login']);
  }
}
