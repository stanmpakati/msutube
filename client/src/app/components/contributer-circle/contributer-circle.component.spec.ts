import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributerCircleComponent } from './contributer-circle.component';

describe('ContributerCircleComponent', () => {
  let component: ContributerCircleComponent;
  let fixture: ComponentFixture<ContributerCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributerCircleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributerCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
