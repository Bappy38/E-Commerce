import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
import { iOrder } from '../model/iOrder';
import { iProduct } from '../model/iProduct';
pdfMake.vfs = pdfFonts.pdfMake.vfs; 

@Injectable({
  providedIn: 'root'
})
export class PdfExportService {

  constructor() { }

  exportPDF(order: any){
    let products: iProduct[] = [];
    let tempString: string = order.userName + " ... " + order.orderNo;

    for(var item of order.orderedProductList){
      products.push(item);
    }

    let docDefinition = {
      content: [
        {
          text: 'Fruit Corner',
          fontSize: 16,
          alignment: 'center',
          color: '#047886'
        },
        {  
          text: 'INVOICE',  
          fontSize: 18,  
          bold: true,  
          alignment: 'center',  
          decoration: 'underline',  
          color: 'skyblue'  
        },
        {
          text: 'Customer Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: `Username: ${order.userName}`,
                bold: true
              },
              {
                text: `Address: ${order.address}`,
                style: 'textBox'
              },
              {
                text: `Contact No: ${order.contact}`,
                style: 'textBox'
              }
            ],
            [
              {
                text: `Date: ${order.orderDate}`,
                alignment: 'right',
                style: 'textBox'
              },
              {
                text: `Order No: ${order.orderNo}`,
                alignment: 'right',
                style: 'textBox'
              }
            ]
          ]
        },
        {
          text: 'Order Details',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            width: ['*' , 'auto' , 'auto' , 'auto'],
            body: [
              ['Product' , 'Price' , 'Quantity' , 'Amount'],
              ...products.map (p => ([p.pName , p.pPrice , p.pQuantity , (p.pPrice * p.pQuantity).toFixed(2)])),
              [{text: 'Total Amount' , colSpan:3} , {} , {} , order.totalCost.toFixed(2)]
            ]
          }
        },
        {
          columns: [
            [{qr : `${tempString}` , fit: '50' , margin: [0 , 50 , 0 , 0]}],
            [{text: 'Customer Signature' , alignment: 'right' , italics: true , margin: [0 , 70 , 0 , 0]}]
          ]
        }
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0 , 15 , 0 , 15]
        },
        textBox: {
          margin: [0 , 10 , 0 , 0]
        }
      }
    };
    pdfMake.createPdf(docDefinition).download();
  }
}
