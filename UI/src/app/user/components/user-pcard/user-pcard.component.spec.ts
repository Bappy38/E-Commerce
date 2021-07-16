import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPcardComponent } from './user-pcard.component';

describe('UserPcardComponent', () => {
  let component: UserPcardComponent;
  let fixture: ComponentFixture<UserPcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
