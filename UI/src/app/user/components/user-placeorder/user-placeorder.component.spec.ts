import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPlaceorderComponent } from './user-placeorder.component';

describe('UserPlaceorderComponent', () => {
  let component: UserPlaceorderComponent;
  let fixture: ComponentFixture<UserPlaceorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPlaceorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPlaceorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
