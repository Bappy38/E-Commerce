import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-user-pcard',
  templateUrl: './user-pcard.component.html',
  styleUrls: ['./user-pcard.component.css']
})
export class UserPcardComponent implements OnInit {
  @Input() product : any;

  constructor() { }

  ngOnInit(): void {
  }

}
