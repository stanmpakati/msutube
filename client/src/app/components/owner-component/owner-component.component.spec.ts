import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerComponentComponent } from './owner-component.component';

describe('OwnerComponentComponent', () => {
  let component: OwnerComponentComponent;
  let fixture: ComponentFixture<OwnerComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
