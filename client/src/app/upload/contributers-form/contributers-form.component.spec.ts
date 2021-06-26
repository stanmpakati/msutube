import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributersFormComponent } from './contributers-form.component';

describe('ContributersFormComponent', () => {
  let component: ContributersFormComponent;
  let fixture: ComponentFixture<ContributersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributersFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
