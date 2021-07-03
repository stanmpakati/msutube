import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoFileDialogComponent } from './no-file-dialog.component';

describe('NoFileDialogComponent', () => {
  let component: NoFileDialogComponent;
  let fixture: ComponentFixture<NoFileDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoFileDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoFileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
