import { Component, AfterViewInit, OnInit, ViewChild, OnChanges, OnDestroy} from '@angular/core';

import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import categories from 'src/assets/json/category.json';
import { UserPlistComponent } from '../user-plist/user-plist.component';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit, AfterViewInit {
  public categories: any = categories;
  category: string = '';
  subCategory: string = '';

  @ViewChild(UserPlistComponent) child: UserPlistComponent;

  constructor(private route : ActivatedRoute,
              private router : Router) {
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.fetchData();
      });
  }

  fetchData(): void {
    const id: string = this.route.snapshot.params['id'];
    if(id){
      const ff: number = parseInt(id.charAt(0));
      this.category = categories[ff].Name;
      if(id.length > 1){
        const ss: number = parseInt(id.charAt(1));
        this.subCategory = categories[ff].SubCategory[ss].Name;
      }
      this.child.getData(this.category, this.subCategory);
    }
  }

  ngAfterViewInit(): void {
    const id: string = this.route.snapshot.params['id'];
    if(id){
      const ff: number = parseInt(id.charAt(0));
      this.category = categories[ff].Name;
      if(id.length > 1){
        const ss: number = parseInt(id.charAt(1));
        this.subCategory = categories[ff].SubCategory[ss].Name;
      }
      this.child.getData(this.category, this.subCategory);
    }
  }

}
