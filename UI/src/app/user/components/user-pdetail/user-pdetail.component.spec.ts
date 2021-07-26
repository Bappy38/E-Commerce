import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPdetailComponent } from './user-pdetail.component';

describe('UserPdetailComponent', () => {
  let component: UserPdetailComponent;
  let fixture: ComponentFixture<UserPdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
