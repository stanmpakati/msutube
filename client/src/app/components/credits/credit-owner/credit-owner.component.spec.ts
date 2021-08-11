import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditOwnerComponent } from './credit-owner.component';

describe('CreditOwnerComponent', () => {
  let component: CreditOwnerComponent;
  let fixture: ComponentFixture<CreditOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditOwnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
