import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { iProduct } from '../model/iProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http : HttpClient) { }

  getProduct(id: string){
    return this.getAllProduct(1 , 8, "", "", "").pipe(
      map(prodList => {
        return prodList.find(product => product.id === id);
      })
    )
  }

  getAllProduct(pageNumber:number , itemsPerPage:number, sortProperty: string,
    sortingOrder: string, searchString: string): Observable<any>{
      let url: string = "https://localhost:5001/api/product/query?pageNumber=";
      url += pageNumber.toString() + "&pageSize=" + itemsPerPage.toString();
      url += "&sortProperty=" + sortProperty + "&sortingOrder=";
      url += sortingOrder + "&searchString=" + searchString;
    return this.http.get(url);
  }
}
