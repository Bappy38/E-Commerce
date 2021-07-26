import { LowerCasePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value:any[] , filterString: string , propName: string): any[] {
    const resultArray = [];
    if(value){
      if(value.length === 0 || filterString === '' || propName === ''){
        return value;
      }

      for(const item of value){
        let str1 = new LowerCasePipe().transform(filterString);
        let str2 = new LowerCasePipe().transform(item[propName]);
        if(str1 == str2){
          resultArray.push(item);
        }
      }
      return resultArray;
    }
  }
}
