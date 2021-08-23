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
    return this.getAllProduct(1 , 100).pipe(
      map(prodList => {
        return prodList.find(product => product.id === id);
      })
    )
  }

  getAllProduct(pageNumber:number , itemsPerPage:number): Observable<iProduct[]>{
    return this.http.get<iProduct[]>("https://localhost:5001/api/product/query?pageNumber=" + pageNumber.toString() + "&pageSize=" + itemsPerPage.toString());
  }

  productsCount(): Observable<number>{
    return this.http.get<number>('https://localhost:5001/api/product/count');
  }
}
