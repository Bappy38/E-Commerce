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
    return this.getAllProduct().pipe(
      map(prodList => {
        return prodList.find(product => product.id === id);
      })
    )
  }

  getAllProduct(): Observable<iProduct[]>{
    return this.http.get<iProduct[]>("https://localhost:5001/api/product/query");
  }
}
