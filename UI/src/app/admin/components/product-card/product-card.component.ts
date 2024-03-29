import { Component, OnInit , Input } from '@angular/core';

import {MatDialog , MatDialogConfig} from '@angular/material/dialog';
import {YesNoDialogComponent} from 'src/app/shared/components/yes-no-dialog/yes-no-dialog.component';
import { ToastrService } from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {UpdateProductComponent} from '../update-product/update-product.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product : any;

  constructor(private dialog : MatDialog , private toastr : ToastrService , private http : HttpClient) { }

  ngOnInit(): void {
    console.log(this.product);
  }

  openRemoveDialog()
  {
    const obj = {
      title: 'Are you sure you want to delete this product?',
      content: 'You will lose all your current data regarding this product!'
    };

    let dialogRef = this.dialog.open(YesNoDialogComponent , {
      minWidth: '400px',
      minHeight: '200px',
      data : obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'true'){
        this.http.post("https://localhost:5001/api/product/delete" , this.product)
          .subscribe(response => {
            this.toastr.success("The product is deleted successfully!");
            window.location.reload();
          }, err => {
            this.toastr.error("You've already delete this product");
          });
      }
    })
  }

  openEditDialog()
  {
    let dialogRef = this.dialog.open(UpdateProductComponent , {
      data : this.product,
      width: '600px',
      hasBackdrop: false,
      panelClass: 'filter-popup'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'true'){
        this.toastr.success("Product updated successfully!");
      }
    });
  }

}
