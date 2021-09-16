import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http : HttpClient) { }

  getProduct(Id: string){
    const reqProduct = {
      "Id": Id
    }
    return this.http.post("https://localhost:5001/api/product/single-query",reqProduct);
  }

  getAllProduct(pageNumber:number , itemsPerPage:number, sortProperty: string,
    sortingOrder: string, searchString: string, cat: string, subcat: string): Observable<any>{
      let url: string = "https://localhost:5001/api/product/query?pageNumber=";
      url += pageNumber.toString() + "&pageSize=" + itemsPerPage.toString();
      url += "&sortProperty=" + sortProperty + "&sortingOrder=";
      url += sortingOrder + "&searchString=" + searchString;
      url += "&category=" + cat;
      url += "&subCategory=" + subcat;

    return this.http.get(url);
  }
}
