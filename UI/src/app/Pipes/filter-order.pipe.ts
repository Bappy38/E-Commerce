import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs/operators';

@Pipe({
  name: 'filterOrder'
})
export class FilterOrderPipe implements PipeTransform {

  transform(value: any[] , filterString: String , propName: String): any[] {
    const resultArray = [];

    if(value){
      if(value.length === 0 || filterString === '' || propName === ''){
        return value;
      }

      for(const item of value){
        if(item.userName == filterString ){
          resultArray.push(item);
        }
        console.log(item);
      }
      return resultArray;
    }
  }

}
