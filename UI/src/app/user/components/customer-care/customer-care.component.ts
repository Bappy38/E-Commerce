import { Component, ElementRef, OnInit , OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer-care',
  templateUrl: './customer-care.component.html',
  styleUrls: ['./customer-care.component.css']
})
export class CustomerCareComponent implements OnInit , OnDestroy {
  Email: String = 'fruitcorner@gmail.com';
  Subject: String = 'Fruitcorner Customer Query';
  Message: String;
  msgForm: FormGroup;
  

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    ;
  }

  initForm(){
    this.msgForm = new FormGroup({
      eSubject: new FormControl(''),
      eMessage: new FormControl('')
    });
  }

  onSubmit(){
    this.Subject = this.msgForm.value.eSubject;
    this.Message = this.msgForm.value.eMessage;
    location.href = "mailto:"+this.Email+"?subject="+this.Subject+"&body="+this.Message;
  }

}
