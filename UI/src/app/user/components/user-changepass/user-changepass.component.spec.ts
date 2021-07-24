import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChangepassComponent } from './user-changepass.component';

describe('UserChangepassComponent', () => {
  let component: UserChangepassComponent;
  let fixture: ComponentFixture<UserChangepassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserChangepassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChangepassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
