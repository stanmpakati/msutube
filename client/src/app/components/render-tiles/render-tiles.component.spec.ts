import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderTilesComponent } from './render-tiles.component';

describe('RenderTilesComponent', () => {
  let component: RenderTilesComponent;
  let fixture: ComponentFixture<RenderTilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderTilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
