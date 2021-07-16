import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPlistComponent } from './user-plist.component';

describe('UserPlistComponent', () => {
  let component: UserPlistComponent;
  let fixture: ComponentFixture<UserPlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
